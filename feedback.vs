#version 410 core

layout (location = 0) in vec3 position;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec2 texcoord;

out VS_OUT{
	vec3 g_position;
	vec2 g_texcoord;
	vec3 g_normal;
	float g_id;
	float g_hit;
	vec3 g_color;
} vs_out;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

void main()
{
	gl_Position = vec4(position, 1.0);

	vs_out.g_position = position;
	vs_out.g_texcoord = texcoord;
	mat3 normalMatrix = mat3(transpose(inverse(view * model)));
	vs_out.g_normal = normalize(vec3(projection * vec4(normalMatrix * normal, 1.0)));
	vs_out.g_id = gl_VertexID;
	vs_out.g_hit = 0.0f;
	vs_out.g_color = vec3(0.0f, 0.0f, 0.0f);
}