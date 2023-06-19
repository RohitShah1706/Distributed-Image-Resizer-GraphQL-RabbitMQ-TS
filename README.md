# Distributed Image Resizing System

A distributed image resizing system built using Express.js, GraphQL, Neo4j, React/Next.js, and RabbitMQ. This system allows users to submit image resizing tasks, which are then distributed to multiple worker nodes for parallel resizing.

## Architecture

The project follows a microservices architecture with the following components:

- **Backend**: Express.js server with GraphQL for managing the task queue and processing requests.
- **Frontend**: React/Next.js application for submitting image resizing requests and tracking task progress.
- **Graph Database**: Neo4j as the graph database for storing task metadata and relationships.
- **Message Broker**: RabbitMQ as the message broker for decoupling task distribution to worker nodes.

## Technologies Used

- [Express.js](https://expressjs.com) - Fast, unopinionated, minimalist web framework for Node.js.
- [GraphQL](https://graphql.org) - Query language for APIs to provide a flexible and efficient approach to data fetching.
- [Neo4j](https://neo4j.com) - Graph database for storing and querying task metadata and relationships.
- [React](https://reactjs.org) / [Next.js](https://nextjs.org) - JavaScript libraries for building user interfaces and server-rendered React applications.
- [RabbitMQ](https://www.rabbitmq.com) - Message broker for decoupling task distribution and enabling asynchronous communication.
- [Sharp](https://sharp.pixelplumbing.com/) - JavaScript image processing library for resizing images.

## How it Works

1. User Interaction:
   - Users interact with the frontend interface by uploading an image and specifying resizing parameters.  

2. Image Resizing Request:
   - The frontend sends a request to the backend, containing the uploaded image and resizing parameters.
   - The backend receives the request and enqueues the image resizing task in RabbitMQ.

3. Task Distribution:
   - Worker nodes, independent processes, or services, continuously listen for tasks in the RabbitMQ queue.
   - Once a worker node detects a new task, it retrieves the message from RabbitMQ and starts processing the image resizing.

4. Image Resizing Process:
   - The worker node utilizes the Jimp library to perform the required image resizing based on the received task details.
   - After completing the resizing process, the worker node can store the resized image in a designated location.

5. Task Completion Notification:
   - Upon finishing the resizing task, the worker node can send a completion or status update message to a separate messaging system or notification service.

6. Frontend Response:
   - The frontend, through polling or utilizing real-time technologies like WebSockets or server-sent events, listens for task completion notifications from the messaging system or notification service.
   - Once the frontend receives the completion notification, it can update the user interface to indicate that the image resizing process is complete.
   - The resized image can be displayed or made available for download to the user.


## Architeture Diagram
404 Not Found lol 😅