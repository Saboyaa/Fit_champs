from sqlalchemy import text
from sqlalchemy.orm import Session
from .database.core import SessionLocal

def schedule_cron_jobs():
    db: Session = SessionLocal()
    try:
        db.execute(text("""
            DO $$
                BEGIN
                IF EXISTS (
                    SELECT 1 FROM cron.job WHERE jobname = 'daily_cleanup'
                ) THEN
                    PERFORM cron.unschedule('daily_cleanup');
                END IF;
            END $$;
        """))

        db.execute(text("""
            SELECT cron.schedule(
                'daily_cleanup',
                '0 23 * * *',
                $$
                    DELETE FROM trains_exercises
                    WHERE train_id IS NULL;
                $$
            );
        """))

        db.execute(text("""
            DO $$
                BEGIN
                IF EXISTS (
                    SELECT 1 FROM cron.job WHERE jobname = 'refresh_general_rank_and_update_user'
                ) THEN
                    PERFORM cron.unschedule('refresh_general_rank_and_update_user');
                END IF;
            END $$;
        """))

        db.execute(text("""
            SELECT cron.schedule(
                'refresh_general_rank_and_update_user',
                '0 0 * * *',
                $$
                    REFRESH MATERIALIZED VIEW general_rank;
                        
                    UPDATE users
                    SET rank_general = gru.rank
                    FROM (
                        SELECT gr.id, gr.total_volume, RANK() OVER (ORDER BY gr.total_volume DESC) AS rank
                        FROM general_rank AS gr
                    ) AS gru
                    WHERE users.id = gru.id;
                $$
            );
        """))

        db.execute(text("""
            DO $$
                BEGIN
                IF EXISTS (
                    SELECT 1 FROM cron.job WHERE jobname = 'refresh_arm_rank_and_update_user'
                ) THEN
                    PERFORM cron.unschedule('refresh_arm_rank_and_update_user');
                END IF;
            END $$;
        """))

        db.execute(text("""
            SELECT cron.schedule(
                'refresh_arm_rank_and_update_user',
                '10 0 * * *',
                $$
                    REFRESH MATERIALIZED VIEW rank_arm;
                        
                    UPDATE users
                    SET rank_arm = aru.rank
                    FROM (
                        SELECT ar.id, ar.total_volume, RANK() OVER (ORDER BY ar.total_volume DESC) AS rank
                        FROM rank_arm AS ar
                    ) AS aru
                    WHERE users.id = aru.id;
                $$
            );
        """))

        db.execute(text("""
            DO $$
                BEGIN
                IF EXISTS (
                    SELECT 1 FROM cron.job WHERE jobname = 'refresh_leg_rank_and_update_user'
                ) THEN
                    PERFORM cron.unschedule('refresh_leg_rank_and_update_user');
                END IF;
            END $$;
        """))

        db.execute(text("""
            SELECT cron.schedule(
                'refresh_leg_rank_and_update_user',
                '20 0 * * *',
                $$
                    REFRESH MATERIALIZED VIEW rank_leg;
                        
                    UPDATE users
                    SET rank_leg = lru.rank
                    FROM (
                        SELECT lr.id, lr.total_volume, RANK() OVER (ORDER BY lr.total_volume DESC) AS rank
                        FROM rank_leg AS lr
                    ) AS lru
                    WHERE users.id = lru.id;
                $$
            );
        """))

        db.execute(text("""
            DO $$
                BEGIN
                IF EXISTS (
                    SELECT 1 FROM cron.job WHERE jobname = 'refresh_shoulder_rank_and_update_user'
                ) THEN
                    PERFORM cron.unschedule('refresh_shoulder_rank_and_update_user');
                END IF;
            END $$;
        """))

        db.execute(text("""
            SELECT cron.schedule(
                'refresh_shoulder_rank_and_update_user',
                '30 0 * * *',
                $$
                    REFRESH MATERIALIZED VIEW rank_shoulder;
                        
                    UPDATE users
                    SET rank_shoulder = sru.rank
                    FROM (
                        SELECT sr.id, sr.total_volume, RANK() OVER (ORDER BY sr.total_volume DESC) AS rank
                        FROM rank_shoulder AS sr
                    ) AS sru
                    WHERE users.id = sru.id;
                $$
            );
        """))

        db.execute(text("""
            DO $$
                BEGIN
                IF EXISTS (
                    SELECT 1 FROM cron.job WHERE jobname = 'refresh_back_rank_and_update_user'
                ) THEN
                    PERFORM cron.unschedule('refresh_back_rank_and_update_user');
                END IF;
            END $$;
        """))

        db.execute(text("""
            SELECT cron.schedule(
                'refresh_back_rank_and_update_user',
                '40 0 * * *',
                $$
                    REFRESH MATERIALIZED VIEW rank_back;
                        
                    UPDATE users
                    SET rank_back = bru.rank
                    FROM (
                        SELECT br.id, br.total_volume, RANK() OVER (ORDER BY br.total_volume DESC) AS rank
                        FROM rank_back AS br
                    ) AS bru
                    WHERE users.id = bru.id;
                $$
            );
        """))

        db.execute(text("""
            DO $$
                BEGIN
                IF EXISTS (
                    SELECT 1 FROM cron.job WHERE jobname = 'refresh_chest_rank_and_update_user'
                ) THEN
                    PERFORM cron.unschedule('refresh_chest_rank_and_update_user');
                END IF;
            END $$;
        """))

        db.execute(text("""
            SELECT cron.schedule(
                'refresh_chest_rank_and_update_user',
                '50 0 * * *',
                $$
                    REFRESH MATERIALIZED VIEW rank_chest;
                        
                    UPDATE users
                    SET rank_chest = cru.rank
                    FROM (
                        SELECT cr.id, cr.total_volume, RANK() OVER (ORDER BY cr.total_volume DESC) AS rank
                        FROM rank_chest AS cr
                    ) AS cru
                    WHERE users.id = cru.id;
                $$
            );
        """))

        db.commit()
    except Exception as e:
        db.rollback()
        raise
    finally:
        db.close()
