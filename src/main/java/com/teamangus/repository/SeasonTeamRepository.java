package com.teamangus.repository;

import com.teamangus.domain.SeasonTeam;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SeasonTeam entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SeasonTeamRepository extends JpaRepository<SeasonTeam, Long> {

}
