package com.teamangus.web.rest;

import com.teamangus.domain.GameTeam;
import com.teamangus.repository.GameTeamRepository;
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
 * REST controller for managing {@link com.teamangus.domain.GameTeam}.
 */
@RestController
@RequestMapping("/api")
public class GameTeamResource {

    private final Logger log = LoggerFactory.getLogger(GameTeamResource.class);

    private static final String ENTITY_NAME = "gameTeam";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GameTeamRepository gameTeamRepository;

    public GameTeamResource(GameTeamRepository gameTeamRepository) {
        this.gameTeamRepository = gameTeamRepository;
    }

    /**
     * {@code POST  /game-teams} : Create a new gameTeam.
     *
     * @param gameTeam the gameTeam to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new gameTeam, or with status {@code 400 (Bad Request)} if the gameTeam has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/game-teams")
    public ResponseEntity<GameTeam> createGameTeam(@RequestBody GameTeam gameTeam) throws URISyntaxException {
        log.debug("REST request to save GameTeam : {}", gameTeam);
        if (gameTeam.getId() != null) {
            throw new BadRequestAlertException("A new gameTeam cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GameTeam result = gameTeamRepository.save(gameTeam);
        return ResponseEntity.created(new URI("/api/game-teams/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /game-teams} : Updates an existing gameTeam.
     *
     * @param gameTeam the gameTeam to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated gameTeam,
     * or with status {@code 400 (Bad Request)} if the gameTeam is not valid,
     * or with status {@code 500 (Internal Server Error)} if the gameTeam couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/game-teams")
    public ResponseEntity<GameTeam> updateGameTeam(@RequestBody GameTeam gameTeam) throws URISyntaxException {
        log.debug("REST request to update GameTeam : {}", gameTeam);
        if (gameTeam.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GameTeam result = gameTeamRepository.save(gameTeam);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, gameTeam.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /game-teams} : get all the gameTeams.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of gameTeams in body.
     */
    @GetMapping("/game-teams")
    public List<GameTeam> getAllGameTeams() {
        log.debug("REST request to get all GameTeams");
        return gameTeamRepository.findAll();
    }

    /**
     * {@code GET  /game-teams/:id} : get the "id" gameTeam.
     *
     * @param id the id of the gameTeam to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the gameTeam, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/game-teams/{id}")
    public ResponseEntity<GameTeam> getGameTeam(@PathVariable Long id) {
        log.debug("REST request to get GameTeam : {}", id);
        Optional<GameTeam> gameTeam = gameTeamRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(gameTeam);
    }

    /**
     * {@code DELETE  /game-teams/:id} : delete the "id" gameTeam.
     *
     * @param id the id of the gameTeam to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/game-teams/{id}")
    public ResponseEntity<Void> deleteGameTeam(@PathVariable Long id) {
        log.debug("REST request to delete GameTeam : {}", id);
        gameTeamRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
