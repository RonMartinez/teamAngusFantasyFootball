package com.teamangus.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Season.
 */
@Entity
@Table(name = "season")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Season implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "year")
    private Integer year;

    @ManyToOne
    @JsonIgnoreProperties("seasons")
    private Rules rules;

    @OneToMany(mappedBy = "season")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Week> weeks = new HashSet<>();

    @OneToMany(mappedBy = "season")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SeasonTeam> seasonTeams = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getYear() {
        return year;
    }

    public Season year(Integer year) {
        this.year = year;
        return this;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Rules getRules() {
        return rules;
    }

    public Season rules(Rules rules) {
        this.rules = rules;
        return this;
    }

    public void setRules(Rules rules) {
        this.rules = rules;
    }

    public Set<Week> getWeeks() {
        return weeks;
    }

    public Season weeks(Set<Week> weeks) {
        this.weeks = weeks;
        return this;
    }

    public Season addWeek(Week week) {
        this.weeks.add(week);
        week.setSeason(this);
        return this;
    }

    public Season removeWeek(Week week) {
        this.weeks.remove(week);
        week.setSeason(null);
        return this;
    }

    public void setWeeks(Set<Week> weeks) {
        this.weeks = weeks;
    }

    public Set<SeasonTeam> getSeasonTeams() {
        return seasonTeams;
    }

    public Season seasonTeams(Set<SeasonTeam> seasonTeams) {
        this.seasonTeams = seasonTeams;
        return this;
    }

    public Season addSeasonTeam(SeasonTeam seasonTeam) {
        this.seasonTeams.add(seasonTeam);
        seasonTeam.setSeason(this);
        return this;
    }

    public Season removeSeasonTeam(SeasonTeam seasonTeam) {
        this.seasonTeams.remove(seasonTeam);
        seasonTeam.setSeason(null);
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
        if (!(o instanceof Season)) {
            return false;
        }
        return id != null && id.equals(((Season) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Season{" +
            "id=" + getId() +
            ", year=" + getYear() +
            "}";
    }
}
