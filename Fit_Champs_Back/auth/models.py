from typing import Literal

from pydantic import BaseModel, Field, EmailStr

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: str | None = None

class UserCreate(BaseModel):
    username: str = Field(title="Nome do usuário", max_length=50)
    email: EmailStr = Field(title="Email do usuário", max_length=50)
    password: str = Field(title="Senha do usuário")
    confirm_password: str = Field(title="Confirmação de senha do usuário")
    city: str = Field(title="Cidade em que o usuário mora", max_length=50)
    sex: Literal['Masculino', 'Feminino'] = Field(title="Genêro do usuário")
    age: int = Field(ge=10, title="Idade do usuário", description="É necessário ser maior ou igual a dez")
    phone: str = Field(pattern=r'\d{11}', title="Telefone do usuário")
    height: int = Field(gt=0, title="Altura do usuário", description="É necessário ser maior que zero")
    weight: int = Field(gt=0, title="Peso do usuário", description="É necessário ser maior que zero")
