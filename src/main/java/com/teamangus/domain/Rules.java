package com.teamangus.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Rules.
 */
@Entity
@Table(name = "rules")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Rules implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "rules")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Season> seasons = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public Rules description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Season> getSeasons() {
        return seasons;
    }

    public Rules seasons(Set<Season> seasons) {
        this.seasons = seasons;
        return this;
    }

    public Rules addSeason(Season season) {
        this.seasons.add(season);
        season.setRules(this);
        return this;
    }

    public Rules removeSeason(Season season) {
        this.seasons.remove(season);
        season.setRules(null);
        return this;
    }

    public void setSeasons(Set<Season> seasons) {
        this.seasons = seasons;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Rules)) {
            return false;
        }
        return id != null && id.equals(((Rules) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Rules{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
