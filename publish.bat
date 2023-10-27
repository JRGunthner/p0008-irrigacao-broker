echo "Publicando p0008-irrigacao-broker"
docker build -t p0008-irrigacao-broker:latest .
docker tag p0008-irrigacao-broker:latest julianogunthner/p0008-irrigacao-broker:latest
docker push julianogunthner/p0008-irrigacao-broker:latest