package com.teamangus.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Week.
 */
@Entity
@Table(name = "week")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Week implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "playoffs")
    private Boolean playoffs;

    @Column(name = "championship")
    private Boolean championship;

    @ManyToOne
    @JsonIgnoreProperties("weeks")
    private Season season;

    @OneToMany(mappedBy = "effectiveWeek")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TeamOwner> teamOwners = new HashSet<>();

    @OneToMany(mappedBy = "week")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Game> weeks = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isPlayoffs() {
        return playoffs;
    }

    public Week playoffs(Boolean playoffs) {
        this.playoffs = playoffs;
        return this;
    }

    public void setPlayoffs(Boolean playoffs) {
        this.playoffs = playoffs;
    }

    public Boolean isChampionship() {
        return championship;
    }

    public Week championship(Boolean championship) {
        this.championship = championship;
        return this;
    }

    public void setChampionship(Boolean championship) {
        this.championship = championship;
    }

    public Season getSeason() {
        return season;
    }

    public Week season(Season season) {
        this.season = season;
        return this;
    }

    public void setSeason(Season season) {
        this.season = season;
    }

    public Set<TeamOwner> getTeamOwners() {
        return teamOwners;
    }

    public Week teamOwners(Set<TeamOwner> teamOwners) {
        this.teamOwners = teamOwners;
        return this;
    }

    public Week addTeamOwner(TeamOwner teamOwner) {
        this.teamOwners.add(teamOwner);
        teamOwner.setEffectiveWeek(this);
        return this;
    }

    public Week removeTeamOwner(TeamOwner teamOwner) {
        this.teamOwners.remove(teamOwner);
        teamOwner.setEffectiveWeek(null);
        return this;
    }

    public void setTeamOwners(Set<TeamOwner> teamOwners) {
        this.teamOwners = teamOwners;
    }

    public Set<Game> getWeeks() {
        return weeks;
    }

    public Week weeks(Set<Game> games) {
        this.weeks = games;
        return this;
    }

    public Week addWeek(Game game) {
        this.weeks.add(game);
        game.setWeek(this);
        return this;
    }

    public Week removeWeek(Game game) {
        this.weeks.remove(game);
        game.setWeek(null);
        return this;
    }

    public void setWeeks(Set<Game> games) {
        this.weeks = games;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Week)) {
            return false;
        }
        return id != null && id.equals(((Week) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Week{" +
            "id=" + getId() +
            ", playoffs='" + isPlayoffs() + "'" +
            ", championship='" + isChampionship() + "'" +
            "}";
    }
}
