package com.teamangus.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * A GameTeam.
 */
@Entity
@Table(name = "game_team")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GameTeam implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "score", precision = 21, scale = 2)
    private BigDecimal score;

    @ManyToOne
    @JsonIgnoreProperties("games")
    private Game game;

    @ManyToOne
    @JsonIgnoreProperties("gameTeams")
    private Team team;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getScore() {
        return score;
    }

    public GameTeam score(BigDecimal score) {
        this.score = score;
        return this;
    }

    public void setScore(BigDecimal score) {
        this.score = score;
    }

    public Game getGame() {
        return game;
    }

    public GameTeam game(Game game) {
        this.game = game;
        return this;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public Team getTeam() {
        return team;
    }

    public GameTeam team(Team team) {
        this.team = team;
        return this;
    }

    public void setTeam(Team team) {
        this.team = team;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GameTeam)) {
            return false;
        }
        return id != null && id.equals(((GameTeam) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "GameTeam{" +
            "id=" + getId() +
            ", score=" + getScore() +
            "}";
    }
}
