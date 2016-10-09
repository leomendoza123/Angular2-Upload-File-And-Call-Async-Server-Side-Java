
 import java.util.Random;
 
public class video{
 
    public static void main(String[] args) {
    	int x = 20; 
    	while (x-->0){
    		
    		
    	  Random rnd = new Random();
          System.out.print((int)(rnd.nextDouble()*100));
          try {
			Thread.sleep(500);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	}
    	System.out.print(100);
    
    
    }
 
}