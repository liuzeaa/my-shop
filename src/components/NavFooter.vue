<template>
    <div>
        <footer class="footer">
          <div class="footer__wrap">
            <div class="footer__secondary">
              <div class="footer__inner">
                <div class="footer__secondary__nav">
                  <span>CoryRight &copyright; {{date}} All Rights Reserved</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data () {
            return {
              date:new Date().getFullYear()
            }
        }
    }
</script>

<style scoped>

</style>
