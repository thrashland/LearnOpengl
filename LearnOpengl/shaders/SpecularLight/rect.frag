#version 430 core

out vec4 FragColor;

in vec3 Normal;
in vec3 FragPos;

uniform vec3 lightPos;
uniform vec3 viewPos;
uniform vec3 lightColor;
uniform vec3 objectColor;

struct Material
{
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
	float shinness;
};

struct Light
{
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
};

uniform Light light;
uniform Material material;

void main()
{
	vec3 ambient = material.ambient * light.ambient;
	
	vec3 norm = normalize(Normal);
	vec3 lightDir = normalize(lightPos - FragPos);
	float diff = max(dot(norm, lightDir), 0.0);
	vec3 diffuse = (diff * material.diffuse) * light.diffuse;

	float specularStrength = 0.5;
	vec3 viewDir = normalize(viewPos - FragPos);
	vec3 reflectDir = reflect(-lightDir, norm);
	float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shinness);
	vec3 specular = (spec * material.specular) * light.specular;

	vec3 result = (ambient + diffuse + specular) * objectColor;
	
	//vec3 result = (ambient + diffuse) * objectColor;
	FragColor = vec4(result, 1.0);
}