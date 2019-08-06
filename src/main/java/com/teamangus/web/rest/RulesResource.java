package com.teamangus.web.rest;

import com.teamangus.domain.Rules;
import com.teamangus.repository.RulesRepository;
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
 * REST controller for managing {@link com.teamangus.domain.Rules}.
 */
@RestController
@RequestMapping("/api")
public class RulesResource {

    private final Logger log = LoggerFactory.getLogger(RulesResource.class);

    private static final String ENTITY_NAME = "rules";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RulesRepository rulesRepository;

    public RulesResource(RulesRepository rulesRepository) {
        this.rulesRepository = rulesRepository;
    }

    /**
     * {@code POST  /rules} : Create a new rules.
     *
     * @param rules the rules to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rules, or with status {@code 400 (Bad Request)} if the rules has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/rules")
    public ResponseEntity<Rules> createRules(@RequestBody Rules rules) throws URISyntaxException {
        log.debug("REST request to save Rules : {}", rules);
        if (rules.getId() != null) {
            throw new BadRequestAlertException("A new rules cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Rules result = rulesRepository.save(rules);
        return ResponseEntity.created(new URI("/api/rules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /rules} : Updates an existing rules.
     *
     * @param rules the rules to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rules,
     * or with status {@code 400 (Bad Request)} if the rules is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rules couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/rules")
    public ResponseEntity<Rules> updateRules(@RequestBody Rules rules) throws URISyntaxException {
        log.debug("REST request to update Rules : {}", rules);
        if (rules.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Rules result = rulesRepository.save(rules);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, rules.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /rules} : get all the rules.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rules in body.
     */
    @GetMapping("/rules")
    public List<Rules> getAllRules() {
        log.debug("REST request to get all Rules");
        return rulesRepository.findAll();
    }

    /**
     * {@code GET  /rules/:id} : get the "id" rules.
     *
     * @param id the id of the rules to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rules, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/rules/{id}")
    public ResponseEntity<Rules> getRules(@PathVariable Long id) {
        log.debug("REST request to get Rules : {}", id);
        Optional<Rules> rules = rulesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rules);
    }

    /**
     * {@code DELETE  /rules/:id} : delete the "id" rules.
     *
     * @param id the id of the rules to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/rules/{id}")
    public ResponseEntity<Void> deleteRules(@PathVariable Long id) {
        log.debug("REST request to delete Rules : {}", id);
        rulesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
