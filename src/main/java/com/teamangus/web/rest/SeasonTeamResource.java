package com.teamangus.web.rest;

import com.teamangus.domain.SeasonTeam;
import com.teamangus.repository.SeasonTeamRepository;
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
 * REST controller for managing {@link com.teamangus.domain.SeasonTeam}.
 */
@RestController
@RequestMapping("/api")
public class SeasonTeamResource {

    private final Logger log = LoggerFactory.getLogger(SeasonTeamResource.class);

    private static final String ENTITY_NAME = "seasonTeam";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SeasonTeamRepository seasonTeamRepository;

    public SeasonTeamResource(SeasonTeamRepository seasonTeamRepository) {
        this.seasonTeamRepository = seasonTeamRepository;
    }

    /**
     * {@code POST  /season-teams} : Create a new seasonTeam.
     *
     * @param seasonTeam the seasonTeam to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new seasonTeam, or with status {@code 400 (Bad Request)} if the seasonTeam has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/season-teams")
    public ResponseEntity<SeasonTeam> createSeasonTeam(@RequestBody SeasonTeam seasonTeam) throws URISyntaxException {
        log.debug("REST request to save SeasonTeam : {}", seasonTeam);
        if (seasonTeam.getId() != null) {
            throw new BadRequestAlertException("A new seasonTeam cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SeasonTeam result = seasonTeamRepository.save(seasonTeam);
        return ResponseEntity.created(new URI("/api/season-teams/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /season-teams} : Updates an existing seasonTeam.
     *
     * @param seasonTeam the seasonTeam to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated seasonTeam,
     * or with status {@code 400 (Bad Request)} if the seasonTeam is not valid,
     * or with status {@code 500 (Internal Server Error)} if the seasonTeam couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/season-teams")
    public ResponseEntity<SeasonTeam> updateSeasonTeam(@RequestBody SeasonTeam seasonTeam) throws URISyntaxException {
        log.debug("REST request to update SeasonTeam : {}", seasonTeam);
        if (seasonTeam.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SeasonTeam result = seasonTeamRepository.save(seasonTeam);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, seasonTeam.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /season-teams} : get all the seasonTeams.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of seasonTeams in body.
     */
    @GetMapping("/season-teams")
    public List<SeasonTeam> getAllSeasonTeams() {
        log.debug("REST request to get all SeasonTeams");
        return seasonTeamRepository.findAll();
    }

    /**
     * {@code GET  /season-teams/:id} : get the "id" seasonTeam.
     *
     * @param id the id of the seasonTeam to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the seasonTeam, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/season-teams/{id}")
    public ResponseEntity<SeasonTeam> getSeasonTeam(@PathVariable Long id) {
        log.debug("REST request to get SeasonTeam : {}", id);
        Optional<SeasonTeam> seasonTeam = seasonTeamRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(seasonTeam);
    }

    /**
     * {@code DELETE  /season-teams/:id} : delete the "id" seasonTeam.
     *
     * @param id the id of the seasonTeam to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/season-teams/{id}")
    public ResponseEntity<Void> deleteSeasonTeam(@PathVariable Long id) {
        log.debug("REST request to delete SeasonTeam : {}", id);
        seasonTeamRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
