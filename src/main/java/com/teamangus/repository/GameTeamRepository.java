package com.teamangus.repository;

import com.teamangus.domain.GameTeam;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GameTeam entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GameTeamRepository extends JpaRepository<GameTeam, Long> {

}
