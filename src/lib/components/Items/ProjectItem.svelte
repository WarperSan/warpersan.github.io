<script lang="ts">
    interface Props {
        title: string;
        description: string;
        href: string;
        cover?: string;
    }

    let { title, description, href, cover }: Props = $props();
</script>

<a class="project" {href} target="_blank">
    <div class="flex h-3/5">
        <img src={cover} alt="Cover of '{title}'" class="w-full h-full object-cover content-center text-center" />
    </div>
    <div class="bottom">
        <h3>{title}</h3>
        <span>{description}</span>
    </div>
</a>
