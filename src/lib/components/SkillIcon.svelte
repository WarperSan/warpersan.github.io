<script lang="ts">
    interface Props {
        skill: string;
    }

    interface Skill {
        iconClass: string;
        text: string;
    }

    function findSkill(skill: string): Skill | null {
        if (skill == "csharp")
            return { iconClass: "devicon-csharp-plain", text: "C#" };
        if (skill == "php")
            return { iconClass: "devicon-php-plain", text: "PHP" };
        if (skill == "js" || skill == "javascript")
            return {
                iconClass: "devicon-javascript-plain",
                text: "JavaScript",
            };
        if (skill == "ts" || skill == "typescript")
            return {
                iconClass: "devicon-typescript-plain",
                text: "TypeScript",
            };
        if (skill == "haxe")
            return { iconClass: "devicon-haxe-plain", text: "Haxe" };
        if (skill == "lua")
            return { iconClass: "devicon-lua-plain", text: "Lua" };
        if (skill == "java")
            return { iconClass: "devicon-java-plain", text: "Java" };
        if (skill == "cpp")
            return { iconClass: "devicon-cplusplus-plain", text: "C++" };
        if (skill == "html")
            return { iconClass: "devicon-html5-plain", text: "HTML" };
        if (skill == "css")
            return { iconClass: "devicon-css3-plain", text: "CSS" };
        if (skill == "bash")
            return { iconClass: "devicon-bash-plain", text: "Bash" };
        if (skill == "markdown")
            return { iconClass: "devicon-markdown-plain", text: "Markdown" };
        if (skill == "nodejs" || skill == "node")
            return { iconClass: "devicon-nodejs-plain", text: "NodeJS" };
        if (skill == "jquery")
            return { iconClass: "devicon-jquery-plain", text: "JQuery" };
        if (skill == "react")
            return { iconClass: "devicon-react-plain", text: "React" };
        if (skill == "codeigniter")
            return {
                iconClass: "devicon-codeigniter-plain",
                text: "CodeIgniter",
            };
        if (skill == "mysql")
            return { iconClass: "devicon-azuresqldatabase-plain", text: "MySQL" };
        if (skill == "mongodb" || skill == "mongo")
            return { iconClass: "devicon-mongodb-plain", text: "MongoDB" };
        if (skill == "github")
            return { iconClass: "devicon-github-plain", text: "GitHub" };
        if (skill == "git")
            return { iconClass: "devicon-git-plain", text: "Git" };
        if (skill == "windows" || skill == "windows11")
            return { iconClass: "devicon-windows11-plain", text: "Windows" };
        if (skill == "linux")
            return { iconClass: "devicon-linux-plain", text: "Linux" };
        if (skill == "docker")
            return { iconClass: "devicon-docker-plain", text: "Docker" };
        if (skill == "jira")
            return { iconClass: "devicon-jira-plain", text: "Jira" };
        if (skill == "slack")
            return { iconClass: "devicon-slack-plain", text: "Slack" };
        if (skill == "sonarqube")
            return { iconClass: "devicon-sonarqube-plain", text: "SonarQube" };
        if (skill == "swagger")
            return { iconClass: "devicon-swagger-plain", text: "Swagger" };
        if (skill == "unity")
            return { iconClass: "devicon-unity-plain", text: "Unity" };
        return null;
    }

    const { skill }: Props = $props();
    // svelte-ignore state_referenced_locally
    const skillData = findSkill(skill);
</script>

{#if skillData != null}
    <div class="skill">
        <i class={skillData.iconClass}></i>
        <span>{skillData.text}</span>
    </div>
{/if}

<style>
    @import url("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css");
</style>
