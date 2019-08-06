package com.teamangus.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Team.
 */
@Entity
@Table(name = "team")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Team implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToMany(mappedBy = "team")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TeamOwner> teamOwners = new HashSet<>();

    @OneToMany(mappedBy = "team")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GameTeam> gameTeams = new HashSet<>();

    @OneToMany(mappedBy = "team")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SeasonTeam> seasonTeams = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<TeamOwner> getTeamOwners() {
        return teamOwners;
    }

    public Team teamOwners(Set<TeamOwner> teamOwners) {
        this.teamOwners = teamOwners;
        return this;
    }

    public Team addTeamOwner(TeamOwner teamOwner) {
        this.teamOwners.add(teamOwner);
        teamOwner.setTeam(this);
        return this;
    }

    public Team removeTeamOwner(TeamOwner teamOwner) {
        this.teamOwners.remove(teamOwner);
        teamOwner.setTeam(null);
        return this;
    }

    public void setTeamOwners(Set<TeamOwner> teamOwners) {
        this.teamOwners = teamOwners;
    }

    public Set<GameTeam> getGameTeams() {
        return gameTeams;
    }

    public Team gameTeams(Set<GameTeam> gameTeams) {
        this.gameTeams = gameTeams;
        return this;
    }

    public Team addGameTeam(GameTeam gameTeam) {
        this.gameTeams.add(gameTeam);
        gameTeam.setTeam(this);
        return this;
    }

    public Team removeGameTeam(GameTeam gameTeam) {
        this.gameTeams.remove(gameTeam);
        gameTeam.setTeam(null);
        return this;
    }

    public void setGameTeams(Set<GameTeam> gameTeams) {
        this.gameTeams = gameTeams;
    }

    public Set<SeasonTeam> getSeasonTeams() {
        return seasonTeams;
    }

    public Team seasonTeams(Set<SeasonTeam> seasonTeams) {
        this.seasonTeams = seasonTeams;
        return this;
    }

    public Team addSeasonTeam(SeasonTeam seasonTeam) {
        this.seasonTeams.add(seasonTeam);
        seasonTeam.setTeam(this);
        return this;
    }

    public Team removeSeasonTeam(SeasonTeam seasonTeam) {
        this.seasonTeams.remove(seasonTeam);
        seasonTeam.setTeam(null);
        return this;
    }

    public void setSeasonTeams(Set<SeasonTeam> seasonTeams) {
        this.seasonTeams = seasonTeams;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Team)) {
            return false;
        }
        return id != null && id.equals(((Team) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Team{" +
            "id=" + getId() +
            "}";
    }
}
