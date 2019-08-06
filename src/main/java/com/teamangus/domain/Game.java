package com.teamangus.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Game.
 */
@Entity
@Table(name = "game")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Game implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties("weeks")
    private Week week;

    @OneToMany(mappedBy = "game")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GameTeam> games = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Week getWeek() {
        return week;
    }

    public Game week(Week week) {
        this.week = week;
        return this;
    }

    public void setWeek(Week week) {
        this.week = week;
    }

    public Set<GameTeam> getGames() {
        return games;
    }

    public Game games(Set<GameTeam> gameTeams) {
        this.games = gameTeams;
        return this;
    }

    public Game addGame(GameTeam gameTeam) {
        this.games.add(gameTeam);
        gameTeam.setGame(this);
        return this;
    }

    public Game removeGame(GameTeam gameTeam) {
        this.games.remove(gameTeam);
        gameTeam.setGame(null);
        return this;
    }

    public void setGames(Set<GameTeam> gameTeams) {
        this.games = gameTeams;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Game)) {
            return false;
        }
        return id != null && id.equals(((Game) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Game{" +
            "id=" + getId() +
            "}";
    }
}
