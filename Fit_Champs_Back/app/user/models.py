from pydantic import BaseModel, Field

class UserDataUpdate(BaseModel):
    username: str = Field(title="Nome do usuário", max_length=50)
    email: str = Field(title="Email do usuário", max_length=50)
    city: str = Field(title="Cidade em que o usuário mora", max_length=50)
    age: int = Field(ge=10, title="Idade do usuário", description="É necessário ser maior ou igual a dez")
    phone: str = Field(pattern=r'\d{11}', title="Telefone do usuário")
    height: int = Field(gt=0, title="Altura do usuário", description="É necessário ser maior que zero")
    weight: int = Field(gt=0, title="Peso do usuário", description="É necessário ser maior que zero")

class UserGoalUpdate(BaseModel):
    goal: int = Field(gt=0, title="Nova meta do usuário", description="É necessário ser maior que zero")

class UserGet(BaseModel):
    id: int = Field(title="ID do usuário")
    username: str = Field(title="Nome do usuário", max_length=50)
    email: str = Field(title="Email do usuário", max_length=50)
    city: str = Field(title="Cidade em que o usuário mora", max_length=50)
    sex: str = Field(title="Gênero do usuário")
    age: int = Field(ge=10, title="Idade do usuário", description="É necessário ser maior ou igual a dez")
    phone: str = Field(pattern=r'\d{11}', title="Telefone do usuário")
    height: int = Field(gt=0, title="Altura do usuário", description="É necessário ser maior que zero")
    weight: int = Field(gt=0, title="Peso do usuário", description="É necessário ser maior que zero")
    rank_chest: int = Field(title="Ranque atual do usuário no grupo muscular")
    rank_back: int = Field(title="Ranque atual do usuário no grupo muscular")
    rank_leg: int = Field(title="Ranque atual do usuário no grupo muscular")
    rank_shoulder: int = Field(title="Ranque atual do usuário no grupo muscular")
    rank_arm: int = Field(title="Ranque atual do usuário no grupo muscular")
    rank_general: int = Field(title="Ranque atual do usuário")
    goal_chest: int = Field(title="Meta atual do usuário no grupo muscular")
    goal_back: int = Field(title="Meta atual do usuário no grupo muscular")
    goal_leg: int = Field(title="Meta atual do usuário no grupo muscular")
    goal_shoulder: int = Field(title="Meta atual do usuário no grupo muscular")
    goal_arm: int = Field(title="Meta atual do usuário no grupo muscular")