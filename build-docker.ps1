$ErrorActionPreference = 'Stop'

$imageName = 'portfolio-site'
$containerName = 'portfolio-site'
$port = 8080

Write-Host "Building Docker image '$imageName'..."
docker build --tag $imageName $PSScriptRoot
if ($LASTEXITCODE -ne 0) {
    throw "Docker image build failed."
}

$existingContainer = docker ps --all --quiet --filter "name=^/$containerName$"
if ($existingContainer) {
    Write-Host "Replacing existing container '$containerName'..."
    docker rm --force $containerName
    if ($LASTEXITCODE -ne 0) {
        throw "Could not remove the existing Docker container."
    }
}

Write-Host "Starting '$containerName' on port $port..."
docker run --detach --name $containerName --publish "${port}:${port}" $imageName
if ($LASTEXITCODE -ne 0) {
    throw "Could not start the Docker container."
}

Write-Host "Website is available at http://localhost:$port/"
