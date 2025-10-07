# Docker Networking

Docker provides a **networking model** that allows containers to communicate with each other, the host system, and external networks.  
It is based on Linux networking concepts like network namespaces, virtual Ethernet interfaces (veth), and bridges.

---

## Default Networks

When Docker is installed, it automatically creates **3 default networks**:

### 1. bridge (default)
- Containers launched without a `--network` option are attached here.  
- Containers get an internal IP address.  
- Containers on the same bridge network can communicate using IP addresses.  
- Requires port mapping (`-p`) to be accessible from outside.

**Example:**
```bash
docker run -it --name c1 busybox
docker run -it --name c2 busybox
docker exec -it c1 ping c2
```

### 2. host
- Shares the **host network namespace**.  
- Container does not get its own IP; it uses host IP and ports directly.  
- Useful when performance is critical (no NAT).

**Example:**
```bash
docker run --network host nginx
```

### 3. none
- Completely isolated from networking.  
- No internet access, no communication with host or other containers.  
- Useful for security sandboxing.

**Example:**
```bash
docker run --network none busybox
```

---

## User-Defined Networks

You can create your own bridge networks for better isolation and DNS-based communication.

**Create network:**
```bash
docker network create mynet
```

**Run containers in custom network:**
```bash
docker run -it --name c1 --network mynet busybox
docker run -it --name c2 --network mynet busybox
```

- Containers `c1` and `c2` can communicate using container names (`ping c2`).  
- Provides built-in **DNS resolution**.

---

## Types of Networks

1. **Bridge** – Default, single-host, NAT-based.  
2. **Host** – Shares host network, no isolation.  
3. **None** – No networking.  
4. **Overlay** – Multi-host networking using Docker Swarm.  
5. **Macvlan** – Assigns a MAC address to containers, appearing as physical devices on the network.  
6. **Custom Networks** – User-defined, allows name-based communication.

---

## Port Mapping

To expose a container port to the host:

```bash
docker run -p 8080:80 nginx
```

- `8080` = host port  
- `80`   = container port  

Access the app at `http://localhost:8080`.

---

## Useful Commands

- List networks:
```bash
docker network ls
```

- Inspect a network:
```bash
docker network inspect bridge
```

- Connect a container to a network:
```bash
docker network connect mynet c1
```

- Disconnect a container:
```bash
docker network disconnect mynet c1
```

---

## Key Points

- Default: bridge, host, none.  
- Use **user-defined bridge networks** for container-to-container DNS communication.  
- Use **overlay networks** for multi-host communication in Docker Swarm.  
- Use **macvlan** for assigning real MAC addresses to containers.  
- Always use **port mapping** (`-p`) to access containers externally.

---
