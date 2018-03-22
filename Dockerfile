FROM sharpnotionsllc/pantry-list-frontend:latest
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
