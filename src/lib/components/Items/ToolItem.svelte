<script lang="ts">
    interface Props {
        title: string;
        description: string;
        href: string;
    }

    let { title, description, href }: Props = $props();
</script>

<a class="tool" {href}>
    <i></i>
    <div>
        <h3 class="m-0 select-none">{title}</h3>
        <span class="text-[color:var(--text-secondary)]">{description}</span>
    </div>
</a>

<style>
    .tool {
        display: flex;
        flex: fit-content;
        gap: 1rem;

        background-color: var(--background-container);
        padding: 1rem;
        border-radius: 1rem;

        box-sizing: border-box;
        overflow-x: hidden;

        transition: all var(--transition-delay) ease-in-out;
    }

    .tool i {
        font-size: 2rem;
        color: var(--light);
    }

    .tool:hover {
        transform: translateY(-4px);
        box-shadow: 0 15px 25px -5px var(--border-input);
    }
</style>
