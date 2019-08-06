package com.teamangus.web.rest;

import com.teamangus.domain.Season;
import com.teamangus.repository.SeasonRepository;
import com.teamangus.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.teamangus.domain.Season}.
 */
@RestController
@RequestMapping("/api")
public class SeasonResource {

    private final Logger log = LoggerFactory.getLogger(SeasonResource.class);

    private static final String ENTITY_NAME = "season";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SeasonRepository seasonRepository;

    public SeasonResource(SeasonRepository seasonRepository) {
        this.seasonRepository = seasonRepository;
    }

    /**
     * {@code POST  /seasons} : Create a new season.
     *
     * @param season the season to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new season, or with status {@code 400 (Bad Request)} if the season has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/seasons")
    public ResponseEntity<Season> createSeason(@RequestBody Season season) throws URISyntaxException {
        log.debug("REST request to save Season : {}", season);
        if (season.getId() != null) {
            throw new BadRequestAlertException("A new season cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Season result = seasonRepository.save(season);
        return ResponseEntity.created(new URI("/api/seasons/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /seasons} : Updates an existing season.
     *
     * @param season the season to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated season,
     * or with status {@code 400 (Bad Request)} if the season is not valid,
     * or with status {@code 500 (Internal Server Error)} if the season couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/seasons")
    public ResponseEntity<Season> updateSeason(@RequestBody Season season) throws URISyntaxException {
        log.debug("REST request to update Season : {}", season);
        if (season.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Season result = seasonRepository.save(season);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, season.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /seasons} : get all the seasons.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of seasons in body.
     */
    @GetMapping("/seasons")
    public List<Season> getAllSeasons() {
        log.debug("REST request to get all Seasons");
        return seasonRepository.findAll();
    }

    /**
     * {@code GET  /seasons/:id} : get the "id" season.
     *
     * @param id the id of the season to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the season, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/seasons/{id}")
    public ResponseEntity<Season> getSeason(@PathVariable Long id) {
        log.debug("REST request to get Season : {}", id);
        Optional<Season> season = seasonRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(season);
    }

    /**
     * {@code DELETE  /seasons/:id} : delete the "id" season.
     *
     * @param id the id of the season to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/seasons/{id}")
    public ResponseEntity<Void> deleteSeason(@PathVariable Long id) {
        log.debug("REST request to delete Season : {}", id);
        seasonRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
