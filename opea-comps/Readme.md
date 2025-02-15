# Running Ollama thirt-party service container

[Ollama Library](https://ollama.com/library)

Pick from the library the desired model version.

Run the following command to spin up the container.

```sh
NO_PROXY=localhost LLM_ENDPOINT_PORT=8008 LLM_MODEL_ID="llama3.2:1b" host_ip=$(hostname -I | awk '{print $1}') docker compose up
```

## Ollama API [link](https://github.com/ollama/ollama/blob/main/docs/api.md)

After server running we can make API calls

## Download (pulling) a model 
```sh
curl http://localhost:8008/api/pull -d '{
  "model": "llama3.2:1b"
}'
```
## Generate a request
```sh
curl --noproxy "*" http://localhost:8008/api/generate -d '{
  "model": "llama3.2:1b",
  "prompt":"Why is the sky blue?"
}'
```