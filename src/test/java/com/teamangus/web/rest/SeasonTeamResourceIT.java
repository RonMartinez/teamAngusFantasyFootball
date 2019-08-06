package com.teamangus.web.rest;

import com.teamangus.TeamAngusFantasyFootballApp;
import com.teamangus.config.TestSecurityConfiguration;
import com.teamangus.domain.SeasonTeam;
import com.teamangus.repository.SeasonTeamRepository;
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
 * Integration tests for the {@link SeasonTeamResource} REST controller.
 */
@SpringBootTest(classes = {TeamAngusFantasyFootballApp.class, TestSecurityConfiguration.class})
public class SeasonTeamResourceIT {

    private static final Integer DEFAULT_YEAR = 1;
    private static final Integer UPDATED_YEAR = 2;
    private static final Integer SMALLER_YEAR = 1 - 1;

    @Autowired
    private SeasonTeamRepository seasonTeamRepository;

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

    private MockMvc restSeasonTeamMockMvc;

    private SeasonTeam seasonTeam;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SeasonTeamResource seasonTeamResource = new SeasonTeamResource(seasonTeamRepository);
        this.restSeasonTeamMockMvc = MockMvcBuilders.standaloneSetup(seasonTeamResource)
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
    public static SeasonTeam createEntity(EntityManager em) {
        SeasonTeam seasonTeam = new SeasonTeam()
            .year(DEFAULT_YEAR);
        return seasonTeam;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SeasonTeam createUpdatedEntity(EntityManager em) {
        SeasonTeam seasonTeam = new SeasonTeam()
            .year(UPDATED_YEAR);
        return seasonTeam;
    }

    @BeforeEach
    public void initTest() {
        seasonTeam = createEntity(em);
    }

    @Test
    @Transactional
    public void createSeasonTeam() throws Exception {
        int databaseSizeBeforeCreate = seasonTeamRepository.findAll().size();

        // Create the SeasonTeam
        restSeasonTeamMockMvc.perform(post("/api/season-teams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seasonTeam)))
            .andExpect(status().isCreated());

        // Validate the SeasonTeam in the database
        List<SeasonTeam> seasonTeamList = seasonTeamRepository.findAll();
        assertThat(seasonTeamList).hasSize(databaseSizeBeforeCreate + 1);
        SeasonTeam testSeasonTeam = seasonTeamList.get(seasonTeamList.size() - 1);
        assertThat(testSeasonTeam.getYear()).isEqualTo(DEFAULT_YEAR);
    }

    @Test
    @Transactional
    public void createSeasonTeamWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = seasonTeamRepository.findAll().size();

        // Create the SeasonTeam with an existing ID
        seasonTeam.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSeasonTeamMockMvc.perform(post("/api/season-teams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seasonTeam)))
            .andExpect(status().isBadRequest());

        // Validate the SeasonTeam in the database
        List<SeasonTeam> seasonTeamList = seasonTeamRepository.findAll();
        assertThat(seasonTeamList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSeasonTeams() throws Exception {
        // Initialize the database
        seasonTeamRepository.saveAndFlush(seasonTeam);

        // Get all the seasonTeamList
        restSeasonTeamMockMvc.perform(get("/api/season-teams?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(seasonTeam.getId().intValue())))
            .andExpect(jsonPath("$.[*].year").value(hasItem(DEFAULT_YEAR)));
    }
    
    @Test
    @Transactional
    public void getSeasonTeam() throws Exception {
        // Initialize the database
        seasonTeamRepository.saveAndFlush(seasonTeam);

        // Get the seasonTeam
        restSeasonTeamMockMvc.perform(get("/api/season-teams/{id}", seasonTeam.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(seasonTeam.getId().intValue()))
            .andExpect(jsonPath("$.year").value(DEFAULT_YEAR));
    }

    @Test
    @Transactional
    public void getNonExistingSeasonTeam() throws Exception {
        // Get the seasonTeam
        restSeasonTeamMockMvc.perform(get("/api/season-teams/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSeasonTeam() throws Exception {
        // Initialize the database
        seasonTeamRepository.saveAndFlush(seasonTeam);

        int databaseSizeBeforeUpdate = seasonTeamRepository.findAll().size();

        // Update the seasonTeam
        SeasonTeam updatedSeasonTeam = seasonTeamRepository.findById(seasonTeam.getId()).get();
        // Disconnect from session so that the updates on updatedSeasonTeam are not directly saved in db
        em.detach(updatedSeasonTeam);
        updatedSeasonTeam
            .year(UPDATED_YEAR);

        restSeasonTeamMockMvc.perform(put("/api/season-teams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSeasonTeam)))
            .andExpect(status().isOk());

        // Validate the SeasonTeam in the database
        List<SeasonTeam> seasonTeamList = seasonTeamRepository.findAll();
        assertThat(seasonTeamList).hasSize(databaseSizeBeforeUpdate);
        SeasonTeam testSeasonTeam = seasonTeamList.get(seasonTeamList.size() - 1);
        assertThat(testSeasonTeam.getYear()).isEqualTo(UPDATED_YEAR);
    }

    @Test
    @Transactional
    public void updateNonExistingSeasonTeam() throws Exception {
        int databaseSizeBeforeUpdate = seasonTeamRepository.findAll().size();

        // Create the SeasonTeam

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSeasonTeamMockMvc.perform(put("/api/season-teams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seasonTeam)))
            .andExpect(status().isBadRequest());

        // Validate the SeasonTeam in the database
        List<SeasonTeam> seasonTeamList = seasonTeamRepository.findAll();
        assertThat(seasonTeamList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSeasonTeam() throws Exception {
        // Initialize the database
        seasonTeamRepository.saveAndFlush(seasonTeam);

        int databaseSizeBeforeDelete = seasonTeamRepository.findAll().size();

        // Delete the seasonTeam
        restSeasonTeamMockMvc.perform(delete("/api/season-teams/{id}", seasonTeam.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SeasonTeam> seasonTeamList = seasonTeamRepository.findAll();
        assertThat(seasonTeamList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SeasonTeam.class);
        SeasonTeam seasonTeam1 = new SeasonTeam();
        seasonTeam1.setId(1L);
        SeasonTeam seasonTeam2 = new SeasonTeam();
        seasonTeam2.setId(seasonTeam1.getId());
        assertThat(seasonTeam1).isEqualTo(seasonTeam2);
        seasonTeam2.setId(2L);
        assertThat(seasonTeam1).isNotEqualTo(seasonTeam2);
        seasonTeam1.setId(null);
        assertThat(seasonTeam1).isNotEqualTo(seasonTeam2);
    }
}
