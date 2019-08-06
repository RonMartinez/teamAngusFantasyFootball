package com.teamangus.repository;

import com.teamangus.domain.TeamOwner;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TeamOwner entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeamOwnerRepository extends JpaRepository<TeamOwner, Long> {

}
