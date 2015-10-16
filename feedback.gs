#version 410 core

layout(triangles, invocations = 1) in;
layout(triangle_strip, max_vertices = 9) out;

in VS_OUT{
	vec3 g_position;
	vec2 g_texcoord;
	vec3 g_normal;
	float g_id;
	float g_hit;
	vec3 g_color;
} gs_in[];

out vec4 outValue;

out fData
{
	vec3 g_position;
    vec2 g_texcoord;
    vec3 g_normal;
    float g_id;
	float g_hit;
	vec3 g_color;
} frag;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
uniform float deltaTime;
uniform vec3 cameraPosition;
uniform vec3 raycast;

vec3 getNormal()
{
	vec3 a = vec3(gl_in[0].gl_Position) - vec3(gl_in[1].gl_Position);
	vec3 b = vec3(gl_in[2].gl_Position) - vec3(gl_in[1].gl_Position);
	return normalize(cross(a, b));
}

vec4 intersect3D_RayTriangle()										//returns color
{
	vec3 u = vec3(gl_in[1].gl_Position) - vec3(gl_in[0].gl_Position);
	vec3 v = vec3(gl_in[2].gl_Position) - vec3(gl_in[0].gl_Position);
	
    // get triangle edge vectors and plane normal
    vec3 n = cross(u, v);              								// cross product
    if (n == vec3(0.0, 0.0, 0.0))             						// triangle is degenerate
        return vec4(0.0, 0.0, 0.0, 0.0);                  			// do not deal with this case and cannot happend in a decent triangle
	
    vec3 dir = raycast;              								// ray direction vector
    vec3 w0 = cameraPosition - vec3(model * gl_in[0].gl_Position).xyz;
    float a = -dot(n,w0);
    float b = dot(n,dir);
    if (abs(b) < 0.00000001) {     									// ray is  parallel to triangle plane
        if (a == 0)                 								// ray lies in triangle plane
            return vec4(0.0, 0.0, 0.0, 0.0);
        else
			return vec4(0.0, 0.0, 0.0, 0.0);              			// ray disjoint from plane
    }

    // get intersect point of ray with triangle plane
    float r = a / b;
    if (r < 0.0 || r > 5.0)                    						// ray goes away from triangle || > length of ray 
        return vec4(0.0, 0.0, 0.0, 0.0);                   								

    vec3 I = cameraPosition + r * dir;            					// intersect point of ray and plane
	
    // is I inside T?
    float    uu, uv, vv, wu, wv, D;
    uu = dot(u,u);
    uv = dot(u,v);
    vv = dot(v,v);
    vec3 w = I - vec3(model * gl_in[0].gl_Position).xyz;
    wu = dot(w,u);
    wv = dot(w,v);
    D = uv * uv - uu * vv;

    // get and test parametric coords
    float s, t;
    s = (uv * wv - vv * wu) / D;
    if (s < 0.0 || s > 1.0)         									// I is outside T
        return vec4(0.0, 0.0, 0.0, 0.0);
    t = (uv * wu - uu * wv) / D;
    if (t < 0.0 || (s + t) > 1.0)  										// I is outside T
        return vec4(0.0, 0.0, 0.0, 0.0);
	
	
    return vec4(I, 1.0);                       					// I is in T
}

void main()
{	
	vec3 normal = getNormal();
	
	outValue = intersect3D_RayTriangle();
	
	vec3 hitpointColor = vec3(1.0, 0.0, 0.0);
	vec3 hitpointBorderColor = vec3(1.0, 1.0, 0.0);
	
	if(outValue.w == 1.0f)
	{
	
		gl_Position = projection * view * model * gl_in[0].gl_Position;
		frag.g_position = vec3(projection * view * model * gl_in[0].gl_Position).xyz;
		frag.g_normal = normal;
		frag.g_texcoord = gs_in[0].g_texcoord;
		frag.g_hit = outValue.w;
		if(frag.g_hit == 1.0f)
			frag.g_color = hitpointBorderColor;
		
		EmitVertex();
		
		outValue = outValue;
		gl_Position = projection * view * model * gl_in[1].gl_Position;
		frag.g_position = vec3(projection * view * model * gl_in[1].gl_Position).xyz;
		frag.g_normal = normal;
		frag.g_texcoord = gs_in[1].g_texcoord;
		frag.g_hit = outValue.w;
		if(frag.g_hit == 1.0f)
			frag.g_color = hitpointBorderColor;
		
		EmitVertex();
		
		outValue = outValue;
		gl_Position = projection * view * vec4(outValue);
		frag.g_position = vec3(projection * view * model * vec4(outValue)).xyz;
		frag.g_normal = normal;
		frag.g_texcoord = gs_in[1].g_texcoord;
		frag.g_hit = outValue.w;
		if(frag.g_hit == 1.0f)
			frag.g_color = hitpointColor;
		
		EmitVertex();
		
		EndPrimitive();
		//

		outValue = outValue;
		gl_Position = projection * view * model * gl_in[1].gl_Position;
		frag.g_position = vec3(projection * view * model * gl_in[1].gl_Position).xyz;
		frag.g_normal = normal;
		frag.g_texcoord = gs_in[1].g_texcoord;
		frag.g_hit = outValue.w;
		if(frag.g_hit == 1.0f)
			frag.g_color = hitpointBorderColor;
		
		EmitVertex();
		
		outValue = outValue;
		gl_Position = projection * view * model * gl_in[2].gl_Position;
		frag.g_position = vec3(projection * view * model * gl_in[2].gl_Position).xyz;
		frag.g_normal = normal;
		frag.g_texcoord = gs_in[2].g_texcoord;
		frag.g_hit = outValue.w;
		if(frag.g_hit == 1.0f)
			frag.g_color = hitpointBorderColor;
		
		EmitVertex();

		outValue = outValue;
		gl_Position = projection * view * vec4(outValue);
		frag.g_position = vec3(projection * view * model * vec4(outValue)).xyz;
		frag.g_normal = normal;
		frag.g_texcoord = gs_in[1].g_texcoord;
		frag.g_hit = outValue.w;
		if(frag.g_hit == 1.0f)
			frag.g_color = hitpointColor;
		
		EmitVertex();
		
		EndPrimitive();
		//
		
		outValue = outValue;
		gl_Position = projection * view * model * gl_in[2].gl_Position;
		frag.g_position = vec3(projection * view * model * gl_in[2].gl_Position).xyz;
		frag.g_normal = normal;
		frag.g_texcoord = gs_in[2].g_texcoord;
		frag.g_hit = outValue.w;
		if(frag.g_hit == 1.0f)
			frag.g_color = hitpointBorderColor;
		
		EmitVertex();
		
		outValue = outValue;
		gl_Position = projection * view * model * gl_in[0].gl_Position;
		frag.g_position = vec3(projection * view * model * gl_in[0].gl_Position).xyz;
		frag.g_normal = normal;
		frag.g_texcoord = gs_in[0].g_texcoord;
		frag.g_hit = outValue.w;
		if(frag.g_hit == 1.0f)
			frag.g_color = hitpointBorderColor;
		
		EmitVertex();

		outValue = outValue;
		gl_Position = projection * view * vec4(outValue);
		frag.g_position = vec3(projection * view * model * vec4(outValue)).xyz;
		frag.g_normal = normal;
		frag.g_texcoord = gs_in[1].g_texcoord;
		frag.g_hit = outValue.w;
		if(frag.g_hit == 1.0f)
			frag.g_color = hitpointColor;
		
		EmitVertex();
		
		EndPrimitive();
	} else {
		outValue = outValue;
		gl_Position = projection * view * model * gl_in[0].gl_Position;
		frag.g_position = vec3(projection * view * model * gl_in[0].gl_Position).xyz;
		frag.g_normal = normal;
		frag.g_texcoord = gs_in[0].g_texcoord;
		frag.g_hit = outValue.w;
		EmitVertex();
		
		outValue = outValue;
		gl_Position = projection * view * model * gl_in[1].gl_Position;
		frag.g_position = vec3(projection * view * model * gl_in[1].gl_Position).xyz;
		frag.g_normal = normal;
		frag.g_texcoord = gs_in[1].g_texcoord;
		frag.g_hit = outValue.w;
		EmitVertex();
		
		outValue = outValue;
		gl_Position = projection * view * model * gl_in[2].gl_Position;
		frag.g_position = vec3(projection * view * model * gl_in[2].gl_Position).xyz;
		frag.g_normal = normal;
		frag.g_texcoord = gs_in[2].g_texcoord;
		frag.g_hit = outValue.w;
		EmitVertex();
		
		
		EndPrimitive();
	}
}