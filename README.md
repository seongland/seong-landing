# Seongland Landing Page
![image](https://user-images.githubusercontent.com/27716524/114999344-badd6f80-9edc-11eb-8b48-9dd012ea0ffc.png)


# Service
- https://seongland.com

## service setup
- cloudflare dns
- gcp load balancer
- gcp bucket
- gatsby
- react
- three.js


# Build

# Docker Build

```bash
docker build -t ghcr.io/sungle3737/portfolio-react:{{VERSION}} .
docker push ghcr.io/sungle3737/portfolio-react:{{VERSION}}
```

# Run

# Docker Run

```bash
docker pull ghcr.io/sungle3737/portfolio-react
docker run   --name seongland -p 54321:8080 -d ghcr.io/sungle3737/portfolio-react
```

## Run Composer
