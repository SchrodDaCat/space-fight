namespace SpriteKind {
    export const StatusBar = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . 5 . . . . . . . 
        . . . . . . 5 5 5 . . . . . . 
        . . . . . . 4 4 4 . . . . . . 
        . . . . . . 8 8 8 . . . . . . 
        . . . . . . a a a . . . . . . 
        . . . . . . b . b . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `, mySprite, 0, -200)
    music.play(music.createSoundEffect(WaveShape.Square, 1600, 1, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
})
controller.anyButton.onEvent(ControllerButtonEvent.Released, function () {
    mySprite.setImage(assets.image`sr-0`)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(assets.image`sr-71`)
})
info.onScore(30, function () {
    game.setGameOverEffect(true, effects.dissolve)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite2, otherSprite2) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite2, effects.fire, 100)
    scene.cameraShake(4, 100)
    music.play(music.createSoundEffect(WaveShape.Noise, 3300, 1400, 255, 0, 150, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(assets.image`sr-1`)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(2)
    sprites.destroy(otherSprite, effects.fire, 200)
})
let mySprite2: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
mySprite = sprites.create(assets.image`sr-0`, SpriteKind.Player)
mySprite.startEffect(effects.spray)
controller.moveSprite(mySprite, 150, 150)
mySprite.setStayInScreen(true)
mySprite.setPosition(80, 100)
info.setLife(10)
game.onUpdateInterval(1000, function () {
    mySprite2 = sprites.create(img`
        . . . . . . . . c c c c . . . . 
        . . . . c c c c c c c c c . . . 
        . . . c f c c a a a a c a c . . 
        . . c c f f f f a a a c a a c . 
        . . c c a f f c a a f f f a a c 
        . . c c a a a a b c f f f a a c 
        . c c c c a c c b a f c a a c c 
        c a f f c c c a b b 6 b b b c c 
        c a f f f f c c c 6 b b b a a c 
        c a a c f f c a 6 6 b b b a a c 
        c c b a a a a b 6 b b a b b a . 
        . c c b b b b b b b a c c b a . 
        . . c c c b c c c b a a b c . . 
        . . . . c b a c c b b b c . . . 
        . . . . c b b a a 6 b c . . . . 
        . . . . . . b 6 6 c c . . . . . 
        `, SpriteKind.Enemy)
    mySprite2.startEffect(effects.fire)
    mySprite2.setPosition(randint(5, 155), 0)
    mySprite2.setVelocity(0, 100)
    mySprite2.setFlag(SpriteFlag.AutoDestroy, true)
})
forever(function () {
    effects.starField.startScreenEffect()
})
