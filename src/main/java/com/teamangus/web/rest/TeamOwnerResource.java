package com.teamangus.web.rest;

import com.teamangus.domain.TeamOwner;
import com.teamangus.repository.TeamOwnerRepository;
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
 * REST controller for managing {@link com.teamangus.domain.TeamOwner}.
 */
@RestController
@RequestMapping("/api")
public class TeamOwnerResource {

    private final Logger log = LoggerFactory.getLogger(TeamOwnerResource.class);

    private static final String ENTITY_NAME = "teamOwner";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TeamOwnerRepository teamOwnerRepository;

    public TeamOwnerResource(TeamOwnerRepository teamOwnerRepository) {
        this.teamOwnerRepository = teamOwnerRepository;
    }

    /**
     * {@code POST  /team-owners} : Create a new teamOwner.
     *
     * @param teamOwner the teamOwner to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new teamOwner, or with status {@code 400 (Bad Request)} if the teamOwner has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/team-owners")
    public ResponseEntity<TeamOwner> createTeamOwner(@RequestBody TeamOwner teamOwner) throws URISyntaxException {
        log.debug("REST request to save TeamOwner : {}", teamOwner);
        if (teamOwner.getId() != null) {
            throw new BadRequestAlertException("A new teamOwner cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TeamOwner result = teamOwnerRepository.save(teamOwner);
        return ResponseEntity.created(new URI("/api/team-owners/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /team-owners} : Updates an existing teamOwner.
     *
     * @param teamOwner the teamOwner to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated teamOwner,
     * or with status {@code 400 (Bad Request)} if the teamOwner is not valid,
     * or with status {@code 500 (Internal Server Error)} if the teamOwner couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/team-owners")
    public ResponseEntity<TeamOwner> updateTeamOwner(@RequestBody TeamOwner teamOwner) throws URISyntaxException {
        log.debug("REST request to update TeamOwner : {}", teamOwner);
        if (teamOwner.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TeamOwner result = teamOwnerRepository.save(teamOwner);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, teamOwner.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /team-owners} : get all the teamOwners.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of teamOwners in body.
     */
    @GetMapping("/team-owners")
    public List<TeamOwner> getAllTeamOwners() {
        log.debug("REST request to get all TeamOwners");
        return teamOwnerRepository.findAll();
    }

    /**
     * {@code GET  /team-owners/:id} : get the "id" teamOwner.
     *
     * @param id the id of the teamOwner to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the teamOwner, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/team-owners/{id}")
    public ResponseEntity<TeamOwner> getTeamOwner(@PathVariable Long id) {
        log.debug("REST request to get TeamOwner : {}", id);
        Optional<TeamOwner> teamOwner = teamOwnerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(teamOwner);
    }

    /**
     * {@code DELETE  /team-owners/:id} : delete the "id" teamOwner.
     *
     * @param id the id of the teamOwner to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/team-owners/{id}")
    public ResponseEntity<Void> deleteTeamOwner(@PathVariable Long id) {
        log.debug("REST request to delete TeamOwner : {}", id);
        teamOwnerRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
