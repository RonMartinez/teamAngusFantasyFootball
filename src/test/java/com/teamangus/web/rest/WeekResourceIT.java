package com.teamangus.web.rest;

import com.teamangus.TeamAngusFantasyFootballApp;
import com.teamangus.config.TestSecurityConfiguration;
import com.teamangus.domain.Week;
import com.teamangus.repository.WeekRepository;
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
 * Integration tests for the {@link WeekResource} REST controller.
 */
@SpringBootTest(classes = {TeamAngusFantasyFootballApp.class, TestSecurityConfiguration.class})
public class WeekResourceIT {

    private static final Boolean DEFAULT_PLAYOFFS = false;
    private static final Boolean UPDATED_PLAYOFFS = true;

    private static final Boolean DEFAULT_CHAMPIONSHIP = false;
    private static final Boolean UPDATED_CHAMPIONSHIP = true;

    @Autowired
    private WeekRepository weekRepository;

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

    private MockMvc restWeekMockMvc;

    private Week week;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WeekResource weekResource = new WeekResource(weekRepository);
        this.restWeekMockMvc = MockMvcBuilders.standaloneSetup(weekResource)
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
    public static Week createEntity(EntityManager em) {
        Week week = new Week()
            .playoffs(DEFAULT_PLAYOFFS)
            .championship(DEFAULT_CHAMPIONSHIP);
        return week;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Week createUpdatedEntity(EntityManager em) {
        Week week = new Week()
            .playoffs(UPDATED_PLAYOFFS)
            .championship(UPDATED_CHAMPIONSHIP);
        return week;
    }

    @BeforeEach
    public void initTest() {
        week = createEntity(em);
    }

    @Test
    @Transactional
    public void createWeek() throws Exception {
        int databaseSizeBeforeCreate = weekRepository.findAll().size();

        // Create the Week
        restWeekMockMvc.perform(post("/api/weeks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(week)))
            .andExpect(status().isCreated());

        // Validate the Week in the database
        List<Week> weekList = weekRepository.findAll();
        assertThat(weekList).hasSize(databaseSizeBeforeCreate + 1);
        Week testWeek = weekList.get(weekList.size() - 1);
        assertThat(testWeek.isPlayoffs()).isEqualTo(DEFAULT_PLAYOFFS);
        assertThat(testWeek.isChampionship()).isEqualTo(DEFAULT_CHAMPIONSHIP);
    }

    @Test
    @Transactional
    public void createWeekWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = weekRepository.findAll().size();

        // Create the Week with an existing ID
        week.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWeekMockMvc.perform(post("/api/weeks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(week)))
            .andExpect(status().isBadRequest());

        // Validate the Week in the database
        List<Week> weekList = weekRepository.findAll();
        assertThat(weekList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllWeeks() throws Exception {
        // Initialize the database
        weekRepository.saveAndFlush(week);

        // Get all the weekList
        restWeekMockMvc.perform(get("/api/weeks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(week.getId().intValue())))
            .andExpect(jsonPath("$.[*].playoffs").value(hasItem(DEFAULT_PLAYOFFS.booleanValue())))
            .andExpect(jsonPath("$.[*].championship").value(hasItem(DEFAULT_CHAMPIONSHIP.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getWeek() throws Exception {
        // Initialize the database
        weekRepository.saveAndFlush(week);

        // Get the week
        restWeekMockMvc.perform(get("/api/weeks/{id}", week.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(week.getId().intValue()))
            .andExpect(jsonPath("$.playoffs").value(DEFAULT_PLAYOFFS.booleanValue()))
            .andExpect(jsonPath("$.championship").value(DEFAULT_CHAMPIONSHIP.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingWeek() throws Exception {
        // Get the week
        restWeekMockMvc.perform(get("/api/weeks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWeek() throws Exception {
        // Initialize the database
        weekRepository.saveAndFlush(week);

        int databaseSizeBeforeUpdate = weekRepository.findAll().size();

        // Update the week
        Week updatedWeek = weekRepository.findById(week.getId()).get();
        // Disconnect from session so that the updates on updatedWeek are not directly saved in db
        em.detach(updatedWeek);
        updatedWeek
            .playoffs(UPDATED_PLAYOFFS)
            .championship(UPDATED_CHAMPIONSHIP);

        restWeekMockMvc.perform(put("/api/weeks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWeek)))
            .andExpect(status().isOk());

        // Validate the Week in the database
        List<Week> weekList = weekRepository.findAll();
        assertThat(weekList).hasSize(databaseSizeBeforeUpdate);
        Week testWeek = weekList.get(weekList.size() - 1);
        assertThat(testWeek.isPlayoffs()).isEqualTo(UPDATED_PLAYOFFS);
        assertThat(testWeek.isChampionship()).isEqualTo(UPDATED_CHAMPIONSHIP);
    }

    @Test
    @Transactional
    public void updateNonExistingWeek() throws Exception {
        int databaseSizeBeforeUpdate = weekRepository.findAll().size();

        // Create the Week

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWeekMockMvc.perform(put("/api/weeks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(week)))
            .andExpect(status().isBadRequest());

        // Validate the Week in the database
        List<Week> weekList = weekRepository.findAll();
        assertThat(weekList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteWeek() throws Exception {
        // Initialize the database
        weekRepository.saveAndFlush(week);

        int databaseSizeBeforeDelete = weekRepository.findAll().size();

        // Delete the week
        restWeekMockMvc.perform(delete("/api/weeks/{id}", week.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Week> weekList = weekRepository.findAll();
        assertThat(weekList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Week.class);
        Week week1 = new Week();
        week1.setId(1L);
        Week week2 = new Week();
        week2.setId(week1.getId());
        assertThat(week1).isEqualTo(week2);
        week2.setId(2L);
        assertThat(week1).isNotEqualTo(week2);
        week1.setId(null);
        assertThat(week1).isNotEqualTo(week2);
    }
}
