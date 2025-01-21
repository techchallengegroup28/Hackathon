CREATE TABLE conteudos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descricao VARCHAR(500),
    data_postagem TIMESTAMP DEFAULT NOW(),
    data_atualizacao TIMESTAMP DEFAULT NOW(),
    texto_conteudo TEXT NOT NULL,
    imagem BYTEA,
    link_youtube TEXT,
    nome_documento TEXT,
    saiba_mais TEXT
);

CREATE TYPE tipo_usuario_enum AS ENUM ('aluno', 'professor');

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    tipo_usuario tipo_usuario_enum NOT NULL
);


INSERT INTO usuarios (nome, email, senha, tipo_usuario)
VALUES ('Professor', 'professor@email.com', '$2a$12$9GLPdmXQfLrpnH6/fsR4t.AGrUY4i6CaJqdwzsj/qjZ.8rBLffm4S', 'professor'); -- senha: 123456
