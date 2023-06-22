## Exemplos de URL

- GET `http://localhost:3000/livros/busca?editora=L%26PM`: busca os livros da editora L&PM cadastrados com os limites de paginação padrão do middleware;
- GET `http://localhost:3000/livros/busca?editora=L%26PM&minPaginas=200`: busca os livros da editora L&PM com mais de 200 páginas e os limites de paginação padrão do middleware;
- GET `http://localhost:3000/livros/busca?maxPaginas=200&sort=editora:1&limit=10`: busca os livros com no máximo 200 páginas, ordena por editora e traz 10 resultados;
- GET `http://localhost:3000/livros?sort=editora:-1&limit=3&page=2`: busca os livros na segunda página limitando em 3 resultados por página e ordena por editora em ordem decrescente.

## TO DO

- Adaptar buscas para funcionar com LIKE;
- Implementar testes;
