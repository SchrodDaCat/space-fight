def on_a_pressed():
    global projectile
    projectile = sprites.create_projectile_from_sprite(img("""
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
        """),
        mySprite,
        0,
        -100)
    music.play(music.melody_playable(music.pew_pew),
        music.PlaybackMode.UNTIL_DONE)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_score():
    game.set_game_over_effect(True, effects.dissolve)
info.on_score(30, on_on_score)

def on_on_overlap(sprite2, otherSprite2):
    info.change_life_by(-1)
    sprites.destroy(otherSprite2, effects.fire, 100)
    scene.camera_shake(4, 100)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap)

def on_on_overlap2(sprite, otherSprite):
    info.change_score_by(2)
    sprites.destroy(otherSprite, effects.fire, 200)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap2)

mySprite2: Sprite = None
projectile: Sprite = None
mySprite: Sprite = None
mySprite = sprites.create(assets.image("""
    sr-71
"""), SpriteKind.player)
controller.move_sprite(mySprite)
mySprite.set_stay_in_screen(True)
mySprite.set_position(80, 100)
info.set_life(10)
animation.run_image_animation(mySprite, assets.animation("""
    myAnim
"""), 100, True)

def on_update_interval():
    global mySprite2
    mySprite2 = sprites.create(img("""
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
        """),
        SpriteKind.enemy)
    mySprite2.set_position(randint(5, 155), 0)
    mySprite2.set_velocity(0, 100)
    mySprite2.set_flag(SpriteFlag.AUTO_DESTROY, True)
game.on_update_interval(1000, on_update_interval)

def on_forever():
    effects.star_field.start_screen_effect()
forever(on_forever)
