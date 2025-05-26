"""create exercises table

Revision ID: c0de6d5bb8d0
Revises: de387240f621
Create Date: 2025-05-25 13:54:38.087943

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c0de6d5bb8d0'
down_revision: Union[str, None] = 'de387240f621'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        CREATE TABLE exercises (
            id SERIAL PRIMARY KEY,
            muscular_group VARCHAR(10),
            submuscular_group VARCHAR(30),
            exercise_name VARCHAR(30)
        );
               
        INSERT INTO exercises (muscular_group, submuscular_group, exercise_name) VALUES
            ('Peito', 'Peitoral Médio', 'Supino Reto'),
            ('Peito', 'Peitoral Superior', 'Supino Inclinado'),
            ('Peito', 'Peitoral Inferior', 'Supino Declinado'),
            ('Peito', 'Peitoral Geral', 'Crucifixo'),
            ('Peito', 'Peitoral Inferior', 'Crossover'),
            ('Peito', 'Peitoral Geral', 'Flexão'),
            ('Peito', 'Peitoral Lateral', 'Peck Deck'),
            ('Peito', 'Peitoral Superior/Serrátil', 'Pullover'),
            ('Peito', 'Peitoral Lateral', 'Voador'),
            ('Peito', 'Peitoral Médio', 'Supino Hammer'),
            ('Peito', 'Peitoral Médio', 'Supino com Halteres'),
            ('Peito', 'Peitoral Médio', 'Push-Up com Peso'),
            ('Peito', 'Peitoral Inferior', 'Paralelas'),
            ('Peito', 'Peitoral Superior', 'Cross-Bench Pullover'),
            ('Peito', 'Peitoral Lateral', 'Cable Fly'),
            -- Treino de Costas
            ('Costas', 'Latíssimo', 'Puxada Frente'),
            ('Costas', 'Dorsal Médio', 'Remada Baixa'),
            ('Costas', 'Dorsal Inferior', 'Remada Curvada'),
            ('Costas', 'Latíssimo/Trapézio', 'Pulldown'),
            ('Costas', 'Latíssimo/Rombóides', 'Barra Fixa'),
            ('Costas', 'Dorsal Lateral', 'Remada Unilateral'),
            ('Costas', 'Dorsal Médio', 'Remada Cavalinho'),
            ('Costas', 'Trapézio/Rombóides', 'Puxada Alta'),
            ('Costas', 'Latíssimo', 'Pull-Up'),
            ('Costas', 'Dorsal Médio/Trapézio', 'Remada T'),
            ('Costas', 'Deltóide Posterior/Trapézio', 'Face Pull'),
            ('Costas', 'Eretores da Espinha', 'Hiperextensão'),
            ('Costas', 'Eretores da Espinha', 'Good Morning'),
            ('Costas', 'Dorsal Inferior', 'Remada Baixa Neutra'),
            ('Costas', 'Dorsal Médio', 'Remada com Corda'),
            ('Costas', 'Latíssimo', 'Pulldown com Corda'),
            ('Costas', 'Dorsal Médio/Latíssimo', 'Australian Pull-Up'),
            -- Treino de Braço
            ('Braço', 'Bíceps', 'Rosca Direta'),
            ('Braço', 'Bíceps/Braquial', 'Rosca Alternada'),
            ('Braço', 'Braquiorradial', 'Rosca Martelo'),
            ('Braço', 'Tríceps Lateral', 'Tríceps Corda'),
            ('Braço', 'Tríceps Longo', 'Tríceps Francês'),
            ('Braço', 'Tríceps Médio', 'Tríceps Testa'),
            ('Braço', 'Bíceps Cabeça Curta', 'Rosca Scott'),
            ('Braço', 'Bíceps Pico', 'Rosca Concentrada'),
            ('Braço', 'Bíceps Completo', 'Rosca 21'),
            ('Braço', 'Bíceps Cabeça Longa', 'Rosca W'),
            ('Braço', 'Tríceps Lateral', 'Tríceps Coice'),
            ('Braço', 'Tríceps Geral', 'Tríceps Mergulho'),
            ('Braço', 'Tríceps Longo', 'Tríceps Barra'),
            ('Braço', 'Tríceps Longo', 'Extensão Overhead'),
            ('Braço', 'Tríceps Lateral', 'Kickback'),
            ('Braço', 'Braquiorradial', 'Rosca Inversa'),
            ('Braço', 'Bíceps Cabeça Longa', 'Rosca Spider'),
            ('Braço', 'Bíceps/Antebraço', 'Rosca Zottman'),
            ('Braço', 'Tríceps Lateral', 'Dips'),
            -- Treino de Perna
            ('Perna', 'Quadríceps/Glúteos', 'Agachamento'),
            ('Perna', 'Quadríceps', 'Leg Press'),
            ('Perna', 'Quadríceps', 'Cadeira Extensora'),
            ('Perna', 'Isquiotibiais', 'Cadeira Flexora'),
            ('Perna', 'Gastrocnêmio', 'Panturrilha'),
            ('Perna', 'Isquiotibiais/Glúteos', 'Stiff'),
            ('Perna', 'Quadríceps/Glúteos', 'Avanço'),
            ('Perna', 'Quadríceps', 'Hack Squat'),
            ('Perna', 'Glúteos/Quadríceps', 'Afundo'),
            ('Perna', 'Adutores', 'Cadeira Adutora'),
            ('Perna', 'Abdutores', 'Cadeira Abdutora'),
            ('Perna', 'Glúteos/Adutores', 'Agachamento Sumô'),
            ('Perna', 'Quadríceps/Glúteos', 'Leg Press 45°'),
            ('Perna', 'Sóleo', 'Panturrilha Sentado'),
            ('Perna', 'Glúteos', 'Elevação Pélvica'),
            ('Perna', 'Quadríceps/Glúteos', 'Bulgarian Split Squat'),
            ('Perna', 'Quadríceps', 'Agachamento Frontal'),
            ('Perna', 'Glúteos/Quadríceps', 'Passada'),
            ('Perna', 'Adutores/Abdutores', 'Good Girl/Bad Girl'),
            ('Perna', 'Glúteos', 'Hip Thrust'),
            ('Perna', 'Gastrocnêmio', 'Panturrilha no Smith'),
            ('Perna', 'Isquiotibiais', 'Leg Curl Unilateral'),
            -- Treino de Ombro
            ('Ombro', 'Deltóide Anterior', 'Desenvolvimento'),
            ('Ombro', 'Deltóide Lateral', 'Elevação Lateral'),
            ('Ombro', 'Deltóide Anterior', 'Elevação Frontal'),
            ('Ombro', 'Deltóide Posterior', 'Face Pull'),
            ('Ombro', 'Trapézio', 'Encolhimento'),
            ('Ombro', 'Deltóide Geral', 'Arnold Press'),
            ('Ombro', 'Deltóide Anterior', 'Desenvolvimento Militar'),
            ('Ombro', 'Deltóide Geral', 'Desenvolvimento com Halteres'),
            ('Ombro', 'Deltóide Posterior', 'Crucifixo Invertido'),
            ('Ombro', 'Deltóide Posterior', 'Pássaro'),
            ('Ombro', 'Deltóide Lateral', 'Elevação Lateral na Polia'),
            ('Ombro', 'Deltóide Anterior', 'Desenvolvimento na Máquina'),
            ('Ombro', 'Trapézio/Deltóide Lateral', 'Remada Alta'),
            ('Ombro', 'Deltóide Geral', 'Desenvolvimento Sentado'),
            ('Ombro', 'Trapézio', 'Shrugs com Halteres'),
            ('Ombro', 'Deltóide Posterior', 'W-Raise'),
            -- Day Off
            ('Day Off', '', '');
               
        CREATE INDEX IF NOT EXISTS exercises_id_idx ON exercises USING hash (id);
        CREATE INDEX IF NOT EXISTS exercises_muscular_group_idx ON exercises USING btree (muscular_group);
    """)


def downgrade() -> None:
    op.execute("""
        DROP INDEX IF EXISTS exercises_idx;
        DROP INDEX IF EXISTS exercises_muscular_group_idx;
        DROP TABLE IF EXISTS exercises;
    """)
