#!/bin/bash
# Helper script to manage Ollama for local AI coding

echo "Ollama Management Script"
echo "========================"

case "$1" in
    start)
        echo "Starting Ollama server..."
        nohup ollama serve > /dev/null 2>&1 &
        echo "Ollama server started in background"
        ;;
    stop)
        echo "Stopping Ollama server..."
        pkill -f ollama
        echo "Ollama server stopped"
        ;;
    status)
        if pgrep -f ollama > /dev/null; then
            echo "Ollama server is running"
        else
            echo "Ollama server is not running"
        fi
        ;;
    restart)
        echo "Restarting Ollama server..."
        pkill -f ollama
        sleep 2
        nohup ollama serve > /dev/null 2>&1 &
        echo "Ollama server restarted"
        ;;
    models)
        echo "Available models:"
        ollama list
        ;;
    *)
        echo "Usage: $0 {start|stop|status|restart|models}"
        echo ""
        echo "Commands:"
        echo "  start   - Start Ollama server in background"
        echo "  stop    - Stop Ollama server"
        echo "  status  - Check if Ollama is running"
        echo "  restart - Restart Ollama server"
        echo "  models  - List available models"
        ;;
esac