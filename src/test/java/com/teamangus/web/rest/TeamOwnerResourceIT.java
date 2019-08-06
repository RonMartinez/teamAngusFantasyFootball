package com.teamangus.web.rest;

import com.teamangus.TeamAngusFantasyFootballApp;
import com.teamangus.config.TestSecurityConfiguration;
import com.teamangus.domain.TeamOwner;
import com.teamangus.repository.TeamOwnerRepository;
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
 * Integration tests for the {@link TeamOwnerResource} REST controller.
 */
@SpringBootTest(classes = {TeamAngusFantasyFootballApp.class, TestSecurityConfiguration.class})
public class TeamOwnerResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private TeamOwnerRepository teamOwnerRepository;

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

    private MockMvc restTeamOwnerMockMvc;

    private TeamOwner teamOwner;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TeamOwnerResource teamOwnerResource = new TeamOwnerResource(teamOwnerRepository);
        this.restTeamOwnerMockMvc = MockMvcBuilders.standaloneSetup(teamOwnerResource)
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
    public static TeamOwner createEntity(EntityManager em) {
        TeamOwner teamOwner = new TeamOwner()
            .name(DEFAULT_NAME);
        return teamOwner;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TeamOwner createUpdatedEntity(EntityManager em) {
        TeamOwner teamOwner = new TeamOwner()
            .name(UPDATED_NAME);
        return teamOwner;
    }

    @BeforeEach
    public void initTest() {
        teamOwner = createEntity(em);
    }

    @Test
    @Transactional
    public void createTeamOwner() throws Exception {
        int databaseSizeBeforeCreate = teamOwnerRepository.findAll().size();

        // Create the TeamOwner
        restTeamOwnerMockMvc.perform(post("/api/team-owners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teamOwner)))
            .andExpect(status().isCreated());

        // Validate the TeamOwner in the database
        List<TeamOwner> teamOwnerList = teamOwnerRepository.findAll();
        assertThat(teamOwnerList).hasSize(databaseSizeBeforeCreate + 1);
        TeamOwner testTeamOwner = teamOwnerList.get(teamOwnerList.size() - 1);
        assertThat(testTeamOwner.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createTeamOwnerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = teamOwnerRepository.findAll().size();

        // Create the TeamOwner with an existing ID
        teamOwner.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTeamOwnerMockMvc.perform(post("/api/team-owners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teamOwner)))
            .andExpect(status().isBadRequest());

        // Validate the TeamOwner in the database
        List<TeamOwner> teamOwnerList = teamOwnerRepository.findAll();
        assertThat(teamOwnerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTeamOwners() throws Exception {
        // Initialize the database
        teamOwnerRepository.saveAndFlush(teamOwner);

        // Get all the teamOwnerList
        restTeamOwnerMockMvc.perform(get("/api/team-owners?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(teamOwner.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getTeamOwner() throws Exception {
        // Initialize the database
        teamOwnerRepository.saveAndFlush(teamOwner);

        // Get the teamOwner
        restTeamOwnerMockMvc.perform(get("/api/team-owners/{id}", teamOwner.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(teamOwner.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTeamOwner() throws Exception {
        // Get the teamOwner
        restTeamOwnerMockMvc.perform(get("/api/team-owners/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTeamOwner() throws Exception {
        // Initialize the database
        teamOwnerRepository.saveAndFlush(teamOwner);

        int databaseSizeBeforeUpdate = teamOwnerRepository.findAll().size();

        // Update the teamOwner
        TeamOwner updatedTeamOwner = teamOwnerRepository.findById(teamOwner.getId()).get();
        // Disconnect from session so that the updates on updatedTeamOwner are not directly saved in db
        em.detach(updatedTeamOwner);
        updatedTeamOwner
            .name(UPDATED_NAME);

        restTeamOwnerMockMvc.perform(put("/api/team-owners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTeamOwner)))
            .andExpect(status().isOk());

        // Validate the TeamOwner in the database
        List<TeamOwner> teamOwnerList = teamOwnerRepository.findAll();
        assertThat(teamOwnerList).hasSize(databaseSizeBeforeUpdate);
        TeamOwner testTeamOwner = teamOwnerList.get(teamOwnerList.size() - 1);
        assertThat(testTeamOwner.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingTeamOwner() throws Exception {
        int databaseSizeBeforeUpdate = teamOwnerRepository.findAll().size();

        // Create the TeamOwner

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTeamOwnerMockMvc.perform(put("/api/team-owners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teamOwner)))
            .andExpect(status().isBadRequest());

        // Validate the TeamOwner in the database
        List<TeamOwner> teamOwnerList = teamOwnerRepository.findAll();
        assertThat(teamOwnerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTeamOwner() throws Exception {
        // Initialize the database
        teamOwnerRepository.saveAndFlush(teamOwner);

        int databaseSizeBeforeDelete = teamOwnerRepository.findAll().size();

        // Delete the teamOwner
        restTeamOwnerMockMvc.perform(delete("/api/team-owners/{id}", teamOwner.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TeamOwner> teamOwnerList = teamOwnerRepository.findAll();
        assertThat(teamOwnerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TeamOwner.class);
        TeamOwner teamOwner1 = new TeamOwner();
        teamOwner1.setId(1L);
        TeamOwner teamOwner2 = new TeamOwner();
        teamOwner2.setId(teamOwner1.getId());
        assertThat(teamOwner1).isEqualTo(teamOwner2);
        teamOwner2.setId(2L);
        assertThat(teamOwner1).isNotEqualTo(teamOwner2);
        teamOwner1.setId(null);
        assertThat(teamOwner1).isNotEqualTo(teamOwner2);
    }
}
