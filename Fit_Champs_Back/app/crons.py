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
                        
                    UPDATE users AS u SET u.rank_general = gru.rank
                    FROM (SELECT gr.id, gr.total_volume, RANK() OVER ( ORDER BY total_volume DESC) FROM general_rank AS gr) AS gru
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
                    REFRESH MATERIALIZED VIEW arm_rank;
                        
                    UPDATE users AS u SET u.rank_arm = gru.rank
                    FROM (SELECT ar.id, ar.total_volume, RANK() OVER ( ORDER BY total_volume DESC) FROM arm_rank AS ar) AS aru
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
                    REFRESH MATERIALIZED VIEW leg_rank;
                        
                    UPDATE users AS u SET u.rank_leg = lru.rank
                    FROM (SELECT lr.id, lr.total_volume, RANK() OVER ( ORDER BY total_volume DESC) FROM leg_rank AS lr) AS lru
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
                    REFRESH MATERIALIZED VIEW shoulder_rank;
                        
                    UPDATE users AS u SET u.rank_shoulder = sru.rank
                    FROM (SELECT sr.id, sr.total_volume, RANK() OVER ( ORDER BY total_volume DESC) FROM shoulder_rank AS sr) AS sru
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
                    REFRESH MATERIALIZED VIEW back_rank;
                        
                    UPDATE users AS u SET u.rank_back = bru.rank
                    FROM (SELECT br.id, br.total_volume, RANK() OVER ( ORDER BY total_volume DESC) FROM back_rank AS br) AS bru
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
                    REFRESH MATERIALIZED VIEW chest_rank;
                        
                    UPDATE users AS u SET u.rank_chest = cru.rank
                    FROM (SELECT cr.id, cr.total_volume, RANK() OVER ( ORDER BY total_volume DESC) FROM chest_rank AS cr) AS cru
                $$
            );
        """))

        db.commit()
    except Exception as e:
        db.rollback()
        raise
    finally:
        db.close()
