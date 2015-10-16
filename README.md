# 3D-Ray-Mesh-Intersection


Content:
Vertex shader
Geometry shader
Fragment shader
3 Screenshots

Goal:
Detecting if a ray hit the mesh or not.
Any hit point on the mesh will be marked as a red colored vertex.
The ray is coming from the center of the camera with a length of 5 units.



How it works:
The code is checking for every triangle drawn in the scene if the ray intersected with it .. [Ray-Triangle intersection]

Steps:
1- in a single triangle making a cross product between the two vectors (p1 - p0) and (p2 - p0)
2- Getting the vector which corresponds to cameraPosition to the vertex point
3- Making a negative dot product between the camera-vertex vector and the normal of the triangle calling it a
4- Making a dot product between the normal of the triangle and the raycast
5- if absolute of b < 0.0000001 then we know ray isn't hitting this triangle
6- then we try to generate intersection point ray-triangle by divinding a over b
7- if r is less than 0 or greater than 5 units then the triangle is behind the ray already [r < 0] or the ray is too short to reach the triangle [r < 5]
8- then we try to get intersection point of ray and plane which is equal to cameraPosition + r * raycast and call it I
9- we then make dot product of uu uv and vv which represents u = (p1-p0) and v = (p2-p0)
10- then define vec3 w = I - position of the vertex in 3d
11- Now the point should look like this P = V(s, t) which is in the triangle in case s >= 0, t >= 0 and s+t <= 1
12- to get s and t we apply algorithm of barycentric Coordinate Computation

s1 = (u.v)(w.v) - (v.v)(w.u)/D
t1 = (u.v)(w.u) - (u.u)(w.v)/D

13- finally we have a final answer which is vector3 of point I which intersects with the triangle  


