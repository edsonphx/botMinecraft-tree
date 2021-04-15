const mineflayer = require('mineflayer')
const { Vec3 } = require('vec3')
const mcData = require('minecraft-data')('1.8')
var sleep = require('sleep');

var bot = mineflayer.createBot({
    host: '52.15.44.224',
    port: 25565,
    username: 'edson2021'
  })

const delayToHomeMs = 5000

  async function runMacro()
  {
    sendMessageOnChat("/login senha123", 20)
    sendMessageOnChat("/tp -302.5 75 180", delayToHomeMs)
    
    const homeLocation = bot.entity.position;

    const expectedTreeLocation = homeLocation.offset(0, -1, -1)

    while(true)
    {
      await consumeFood()
      //plantarArvore
      await plantTree(expectedTreeLocation)

      var axe = bot.inventory.findInventoryItem(279, null)

      if (axe == null) 
      {
        axe = craftAxe()
        console.log("machado")
        return;
      }

      await bot.equip(axe)

      //cortarArvore
      await cutTree(expectedTreeLocation)
    }
  }

  async function consumeFood()
  {
    if(bot.food < 10)
      {
        var steak = bot.inventory.findInventoryItem(364, null)

        if(steak == null){
          //pegar carne
        }
      }
  }

  async function plantTree(treeLocation)
  {
    var sapling = bot.inventory.findInventoryItem(6, null)

    if (sapling == null) 
    {
      //pegar sapling
      console.log("cabo muda")
      return;
    }

    await bot.equip(sapling)

    await bot.placeBlock(bot.blockAt(treeLocation.offset(0, -1, 0)), new Vec3(0, 1, 0))

    const boneMeal = bot.inventory.findInventoryItem(351, null);

    if (boneMeal == null) 
    {
      //pegar sapling
      console.log("cabo FARINHA DE OSSO")
      return;
    }

    await bot.equip(boneMeal)

    while(bot.blockAt(treeLocation).type == 6)
    {
      console.log(bot.blockAt(treeLocation).type)
      await bot.activateBlock(bot.blockAt(treeLocation))
      //ver se acabou bonemeal
    }
  }

  async function cutTree(treeLocation)
  {
    var actualLoc = treeLocation
    var block = bot.blockAt(actualLoc);

    console.log(block)
    while (block.type == 17)
    {
      await bot.dig(block)
      actualLoc = actualLoc.offset(0, 1, 0)
      block = bot.blockAt(actualLoc)
      
      if(actualLoc.y - treeLocation.y >= 8)
        break;
    }
  }

  function sendMessageOnChat(message, delay)
  {
    bot.chat(message)
    sleep.msleep(delay)
  }

  bot.once('spawn', runMacro)