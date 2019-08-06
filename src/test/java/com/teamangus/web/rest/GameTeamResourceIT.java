package com.teamangus.web.rest;

import com.teamangus.TeamAngusFantasyFootballApp;
import com.teamangus.config.TestSecurityConfiguration;
import com.teamangus.domain.GameTeam;
import com.teamangus.repository.GameTeamRepository;
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
import java.math.BigDecimal;
import java.util.List;

import static com.teamangus.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link GameTeamResource} REST controller.
 */
@SpringBootTest(classes = {TeamAngusFantasyFootballApp.class, TestSecurityConfiguration.class})
public class GameTeamResourceIT {

    private static final BigDecimal DEFAULT_SCORE = new BigDecimal(1);
    private static final BigDecimal UPDATED_SCORE = new BigDecimal(2);
    private static final BigDecimal SMALLER_SCORE = new BigDecimal(1 - 1);

    @Autowired
    private GameTeamRepository gameTeamRepository;

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

    private MockMvc restGameTeamMockMvc;

    private GameTeam gameTeam;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GameTeamResource gameTeamResource = new GameTeamResource(gameTeamRepository);
        this.restGameTeamMockMvc = MockMvcBuilders.standaloneSetup(gameTeamResource)
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
    public static GameTeam createEntity(EntityManager em) {
        GameTeam gameTeam = new GameTeam()
            .score(DEFAULT_SCORE);
        return gameTeam;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GameTeam createUpdatedEntity(EntityManager em) {
        GameTeam gameTeam = new GameTeam()
            .score(UPDATED_SCORE);
        return gameTeam;
    }

    @BeforeEach
    public void initTest() {
        gameTeam = createEntity(em);
    }

    @Test
    @Transactional
    public void createGameTeam() throws Exception {
        int databaseSizeBeforeCreate = gameTeamRepository.findAll().size();

        // Create the GameTeam
        restGameTeamMockMvc.perform(post("/api/game-teams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameTeam)))
            .andExpect(status().isCreated());

        // Validate the GameTeam in the database
        List<GameTeam> gameTeamList = gameTeamRepository.findAll();
        assertThat(gameTeamList).hasSize(databaseSizeBeforeCreate + 1);
        GameTeam testGameTeam = gameTeamList.get(gameTeamList.size() - 1);
        assertThat(testGameTeam.getScore()).isEqualTo(DEFAULT_SCORE);
    }

    @Test
    @Transactional
    public void createGameTeamWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gameTeamRepository.findAll().size();

        // Create the GameTeam with an existing ID
        gameTeam.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGameTeamMockMvc.perform(post("/api/game-teams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameTeam)))
            .andExpect(status().isBadRequest());

        // Validate the GameTeam in the database
        List<GameTeam> gameTeamList = gameTeamRepository.findAll();
        assertThat(gameTeamList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGameTeams() throws Exception {
        // Initialize the database
        gameTeamRepository.saveAndFlush(gameTeam);

        // Get all the gameTeamList
        restGameTeamMockMvc.perform(get("/api/game-teams?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gameTeam.getId().intValue())))
            .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE.intValue())));
    }
    
    @Test
    @Transactional
    public void getGameTeam() throws Exception {
        // Initialize the database
        gameTeamRepository.saveAndFlush(gameTeam);

        // Get the gameTeam
        restGameTeamMockMvc.perform(get("/api/game-teams/{id}", gameTeam.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gameTeam.getId().intValue()))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingGameTeam() throws Exception {
        // Get the gameTeam
        restGameTeamMockMvc.perform(get("/api/game-teams/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGameTeam() throws Exception {
        // Initialize the database
        gameTeamRepository.saveAndFlush(gameTeam);

        int databaseSizeBeforeUpdate = gameTeamRepository.findAll().size();

        // Update the gameTeam
        GameTeam updatedGameTeam = gameTeamRepository.findById(gameTeam.getId()).get();
        // Disconnect from session so that the updates on updatedGameTeam are not directly saved in db
        em.detach(updatedGameTeam);
        updatedGameTeam
            .score(UPDATED_SCORE);

        restGameTeamMockMvc.perform(put("/api/game-teams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGameTeam)))
            .andExpect(status().isOk());

        // Validate the GameTeam in the database
        List<GameTeam> gameTeamList = gameTeamRepository.findAll();
        assertThat(gameTeamList).hasSize(databaseSizeBeforeUpdate);
        GameTeam testGameTeam = gameTeamList.get(gameTeamList.size() - 1);
        assertThat(testGameTeam.getScore()).isEqualTo(UPDATED_SCORE);
    }

    @Test
    @Transactional
    public void updateNonExistingGameTeam() throws Exception {
        int databaseSizeBeforeUpdate = gameTeamRepository.findAll().size();

        // Create the GameTeam

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGameTeamMockMvc.perform(put("/api/game-teams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameTeam)))
            .andExpect(status().isBadRequest());

        // Validate the GameTeam in the database
        List<GameTeam> gameTeamList = gameTeamRepository.findAll();
        assertThat(gameTeamList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGameTeam() throws Exception {
        // Initialize the database
        gameTeamRepository.saveAndFlush(gameTeam);

        int databaseSizeBeforeDelete = gameTeamRepository.findAll().size();

        // Delete the gameTeam
        restGameTeamMockMvc.perform(delete("/api/game-teams/{id}", gameTeam.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GameTeam> gameTeamList = gameTeamRepository.findAll();
        assertThat(gameTeamList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GameTeam.class);
        GameTeam gameTeam1 = new GameTeam();
        gameTeam1.setId(1L);
        GameTeam gameTeam2 = new GameTeam();
        gameTeam2.setId(gameTeam1.getId());
        assertThat(gameTeam1).isEqualTo(gameTeam2);
        gameTeam2.setId(2L);
        assertThat(gameTeam1).isNotEqualTo(gameTeam2);
        gameTeam1.setId(null);
        assertThat(gameTeam1).isNotEqualTo(gameTeam2);
    }
}
