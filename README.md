## Weather Forcastify

![Application Screenshot](https://github.com/user-attachments/assets/46cbb34a-c49a-4b00-9672-2b7bc4565248)

## Running the Docker Container:
### Build the Image:

```bash
docker build -t weather-forcastify .
```
### Run the Container:

```bash
docker run -p 5173:5173 -v $(pwd):/app -w /app weather-forcastify
```
`-p 5173:5173`: Maps the container's port `5173` to your machine's port `5173`.

`-v $(pwd):/app`: Mounts the current project directory on the host machine to `/app` in the container. This enables live reload (hot module replacement).

`-w /app`: Ensures the working directory inside the container is `/app`.