#version 410 core

in fData
{
	vec3 g_position;
    vec2 g_texcoord;
    vec3 g_normal;
    float g_id;
	float g_hit;
	vec3 g_color;
} frag;

uniform sampler2D diffuse_texture;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
uniform float deltaTime;

out vec4 FragColor;


void main()
{
	if(frag.g_hit == 1.0f) {
		FragColor = vec4(frag.g_color, 1.0);
	} else {
		mat3 normalMatrix = transpose(inverse(mat3(model)));
		vec3 normal = normalize(normalMatrix * frag.g_normal);

		vec3 lightPosition = vec3(500.0, 0.0, -500.0);
		vec3 lightIntensity = vec3(1.0, 1.0, 1.0);
		vec3 surface_to_light = lightPosition - frag.g_position;

		float brightness = max(0.5, dot(normal, surface_to_light)/(length(surface_to_light) * length(normal)));
		brightness = clamp(brightness, 0, 1);
		
		vec4 surfaceColor = vec4(0.0, 0.0, 0.4, 1.0);
		FragColor = vec4(brightness * lightIntensity * surfaceColor.rgb, surfaceColor.a);
	}
}