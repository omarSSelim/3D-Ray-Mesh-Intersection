# 3D-Ray-Mesh-Intersection

<br><br>
Content:
Vertex shader
Geometry shader
Fragment shader
3 Screenshots
<br>
Goal:
Detecting if a ray hit the mesh or not.
Any hit point on the mesh will be marked as a red colored vertex.
The ray is coming from the center of the camera with a length of 5 units.
<br>
<br>
<br>
How it works:
The code is checking for every triangle drawn in the scene if the ray intersected with it .. [Ray-Triangle intersection]
<br>
Steps:
1- in a single triangle making a cross product between the two vectors (p1 - p0) and (p2 - p0)<br>
2- Getting the vector which corresponds to cameraPosition to the vertex point<br>
3- Making a negative dot product between the camera-vertex vector and the normal of the triangle calling it a<br>
4- Making a dot product between the normal of the triangle and the raycast<br>
5- if absolute of b < 0.0000001 then we know ray isn't hitting this triangle<br>
6- then we try to generate intersection point ray-triangle by divinding a over b<br>
7- if r is less than 0 or greater than 5 units then the triangle is behind the ray already [r < 0] or the ray is too short to reach the triangle [r < 5]<br>
8- then we try to get intersection point of ray and plane which is equal to cameraPosition + r * raycast and call it I<br>
9- we then make dot product of uu uv and vv which represents u = (p1-p0) and v = (p2-p0)<br>
10- then define vec3 w = I - position of the vertex in 3d<br>
11- Now the point should look like this P = V(s, t) which is in the triangle in case s >= 0, t >= 0 and s+t <= 1<br>
12- to get s and t we apply algorithm of barycentric Coordinate Computation<br>
<br>
s1 = (u.v)(w.v) - (v.v)(w.u)/D<br>
t1 = (u.v)(w.u) - (u.u)(w.v)/D<br>
<br>
13- finally we have a final answer which is vector3 of point I which intersects with the triangle  <br><br>


