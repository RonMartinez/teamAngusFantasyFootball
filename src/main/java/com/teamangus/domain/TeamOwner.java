package com.teamangus.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A TeamOwner.
 */
@Entity
@Table(name = "team_owner")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TeamOwner implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JsonIgnoreProperties("teamOwners")
    private Team team;

    @ManyToOne
    @JsonIgnoreProperties("teamOwners")
    private Owner owner;

    @ManyToOne
    @JsonIgnoreProperties("teamOwners")
    private Week effectiveWeek;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public TeamOwner name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Team getTeam() {
        return team;
    }

    public TeamOwner team(Team team) {
        this.team = team;
        return this;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public Owner getOwner() {
        return owner;
    }

    public TeamOwner owner(Owner owner) {
        this.owner = owner;
        return this;
    }

    public void setOwner(Owner owner) {
        this.owner = owner;
    }

    public Week getEffectiveWeek() {
        return effectiveWeek;
    }

    public TeamOwner effectiveWeek(Week week) {
        this.effectiveWeek = week;
        return this;
    }

    public void setEffectiveWeek(Week week) {
        this.effectiveWeek = week;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TeamOwner)) {
            return false;
        }
        return id != null && id.equals(((TeamOwner) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TeamOwner{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
