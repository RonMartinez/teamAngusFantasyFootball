package com.teamangus.web.rest;

import com.teamangus.TeamAngusFantasyFootballApp;
import com.teamangus.config.TestSecurityConfiguration;
import com.teamangus.domain.Rules;
import com.teamangus.repository.RulesRepository;
import com.teamangus.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.teamangus.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RulesResource} REST controller.
 */
@SpringBootTest(classes = {TeamAngusFantasyFootballApp.class, TestSecurityConfiguration.class})
public class RulesResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private RulesRepository rulesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restRulesMockMvc;

    private Rules rules;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RulesResource rulesResource = new RulesResource(rulesRepository);
        this.restRulesMockMvc = MockMvcBuilders.standaloneSetup(rulesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rules createEntity(EntityManager em) {
        Rules rules = new Rules()
            .description(DEFAULT_DESCRIPTION);
        return rules;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rules createUpdatedEntity(EntityManager em) {
        Rules rules = new Rules()
            .description(UPDATED_DESCRIPTION);
        return rules;
    }

    @BeforeEach
    public void initTest() {
        rules = createEntity(em);
    }

    @Test
    @Transactional
    public void createRules() throws Exception {
        int databaseSizeBeforeCreate = rulesRepository.findAll().size();

        // Create the Rules
        restRulesMockMvc.perform(post("/api/rules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rules)))
            .andExpect(status().isCreated());

        // Validate the Rules in the database
        List<Rules> rulesList = rulesRepository.findAll();
        assertThat(rulesList).hasSize(databaseSizeBeforeCreate + 1);
        Rules testRules = rulesList.get(rulesList.size() - 1);
        assertThat(testRules.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createRulesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rulesRepository.findAll().size();

        // Create the Rules with an existing ID
        rules.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRulesMockMvc.perform(post("/api/rules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rules)))
            .andExpect(status().isBadRequest());

        // Validate the Rules in the database
        List<Rules> rulesList = rulesRepository.findAll();
        assertThat(rulesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRules() throws Exception {
        // Initialize the database
        rulesRepository.saveAndFlush(rules);

        // Get all the rulesList
        restRulesMockMvc.perform(get("/api/rules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rules.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getRules() throws Exception {
        // Initialize the database
        rulesRepository.saveAndFlush(rules);

        // Get the rules
        restRulesMockMvc.perform(get("/api/rules/{id}", rules.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rules.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRules() throws Exception {
        // Get the rules
        restRulesMockMvc.perform(get("/api/rules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRules() throws Exception {
        // Initialize the database
        rulesRepository.saveAndFlush(rules);

        int databaseSizeBeforeUpdate = rulesRepository.findAll().size();

        // Update the rules
        Rules updatedRules = rulesRepository.findById(rules.getId()).get();
        // Disconnect from session so that the updates on updatedRules are not directly saved in db
        em.detach(updatedRules);
        updatedRules
            .description(UPDATED_DESCRIPTION);

        restRulesMockMvc.perform(put("/api/rules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRules)))
            .andExpect(status().isOk());

        // Validate the Rules in the database
        List<Rules> rulesList = rulesRepository.findAll();
        assertThat(rulesList).hasSize(databaseSizeBeforeUpdate);
        Rules testRules = rulesList.get(rulesList.size() - 1);
        assertThat(testRules.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingRules() throws Exception {
        int databaseSizeBeforeUpdate = rulesRepository.findAll().size();

        // Create the Rules

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRulesMockMvc.perform(put("/api/rules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rules)))
            .andExpect(status().isBadRequest());

        // Validate the Rules in the database
        List<Rules> rulesList = rulesRepository.findAll();
        assertThat(rulesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRules() throws Exception {
        // Initialize the database
        rulesRepository.saveAndFlush(rules);

        int databaseSizeBeforeDelete = rulesRepository.findAll().size();

        // Delete the rules
        restRulesMockMvc.perform(delete("/api/rules/{id}", rules.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Rules> rulesList = rulesRepository.findAll();
        assertThat(rulesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Rules.class);
        Rules rules1 = new Rules();
        rules1.setId(1L);
        Rules rules2 = new Rules();
        rules2.setId(rules1.getId());
        assertThat(rules1).isEqualTo(rules2);
        rules2.setId(2L);
        assertThat(rules1).isNotEqualTo(rules2);
        rules1.setId(null);
        assertThat(rules1).isNotEqualTo(rules2);
    }
}
