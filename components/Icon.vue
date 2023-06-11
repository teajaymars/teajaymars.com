<script setup lang="ts">
const props = defineProps<{
  icon: string
  pack?: 'fad' | 'fas' | 'fab'
  size?: 'large' | 'medium' | 'small'
  variant?: 'primary' | 'info' | 'default' | 'danger' | 'success' | 'warning'
  spin?: boolean
}>()

function getSizeClass() {
  switch (props.size) {
    case 'large':
      return 'fa-2x'
    case 'medium':
      return 'fa-lg'
    default:
      return null
  }
}

function getColorClass() {
  if (props.variant && props.variant !== 'default') {
    return 'has-text-' + props.variant
  }
  return undefined
}

const outerClasses = computed(() => {
  const sizeClass = props.size ? 'is-' + props.size : null
  return ['icon', sizeClass].filter(Boolean).join(' ')
})

const classes = computed(() => {
  return [
    getSizeClass(),
    getColorClass(),
    props.pack ?? 'fas',
    'fa-' + props.icon,
    props.spin ? 'fa-spin' : null,
  ]
    .filter(Boolean)
    .join(' ')
})
</script>

<template>
  <span :class="outerClasses">
    <i :class="classes" />
  </span>
</template>
