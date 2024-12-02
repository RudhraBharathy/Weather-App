## Weather Forcastify

![Application Screenshot](https://github.com/user-attachments/assets/18e6b6a2-5a1f-4f1c-9ecc-302fa81e0304)

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