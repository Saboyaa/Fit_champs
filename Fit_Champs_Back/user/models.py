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