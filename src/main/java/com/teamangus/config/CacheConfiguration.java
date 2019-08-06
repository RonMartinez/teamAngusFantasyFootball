package com.teamangus.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.teamangus.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.teamangus.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.teamangus.domain.User.class.getName());
            createCache(cm, com.teamangus.domain.Authority.class.getName());
            createCache(cm, com.teamangus.domain.User.class.getName() + ".authorities");
            createCache(cm, com.teamangus.domain.Owner.class.getName());
            createCache(cm, com.teamangus.domain.Owner.class.getName() + ".teamOwners");
            createCache(cm, com.teamangus.domain.Team.class.getName());
            createCache(cm, com.teamangus.domain.Team.class.getName() + ".teamOwners");
            createCache(cm, com.teamangus.domain.Team.class.getName() + ".gameTeams");
            createCache(cm, com.teamangus.domain.Team.class.getName() + ".seasonTeams");
            createCache(cm, com.teamangus.domain.TeamOwner.class.getName());
            createCache(cm, com.teamangus.domain.Rules.class.getName());
            createCache(cm, com.teamangus.domain.Rules.class.getName() + ".seasons");
            createCache(cm, com.teamangus.domain.Season.class.getName());
            createCache(cm, com.teamangus.domain.Season.class.getName() + ".weeks");
            createCache(cm, com.teamangus.domain.Season.class.getName() + ".seasonTeams");
            createCache(cm, com.teamangus.domain.Week.class.getName());
            createCache(cm, com.teamangus.domain.Week.class.getName() + ".teamOwners");
            createCache(cm, com.teamangus.domain.Week.class.getName() + ".weeks");
            createCache(cm, com.teamangus.domain.Game.class.getName());
            createCache(cm, com.teamangus.domain.Game.class.getName() + ".games");
            createCache(cm, com.teamangus.domain.GameTeam.class.getName());
            createCache(cm, com.teamangus.domain.SeasonTeam.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}
