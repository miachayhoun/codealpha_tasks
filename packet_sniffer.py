from scapy.all import sniff,IP, TCP,UDP,ICMP,Raw

#sniff() is a fct that captures packets
# protocols tell us how data is being sent
#tcp ->like web browsing (file transfer)
#udp-> faster ,connectionless
#icmp-> control messages(like ping)

def capture_packet(packet):
    if packet.haslayer(IP):
       src_ip=packet[IP].src
       dst_ip=packet[IP].dst
       protocol=""  #empty by default
       src_port=""
       dst_port=""

    #sport and dport mean sourse port and dest port 
    #since ICMP doesnt use port, it deosnt need those
       #the first matching protocol will be recorded
       if packet.haslayer(TCP):
        protocol="TCP"
        src_port = packet[TCP].sport
        dst_port = packet[TCP].dport
       elif packet.haslayer(UDP):
        protocol="UDP"
        src_port = packet[UDP].sport
        dst_port = packet[UDP].dport
       elif packet.haslayer(ICMP):
        protocol="ICMP"

       if protocol in ["TCP","UDP"]:
        print(f"{src_ip}:{src_port}--> {dst_ip}:{dst_port}, protocol: {protocol}")
       else:
        print(f"{src_ip}--> {dst_ip},protocol:{protocol}")
       if packet.haslayer(Raw):
        payload=packet[Raw].load
        print("payload (first 50 bytes):",payload[:50])
       print("-" * 60)  # separator between packets
    
    #for every packet captured it prints a summary about it 
sniff(prn=capture_packet,store=False,count=20) 


#prn is to process the packets asap
# store=false is to avoid saving in the memory 
#the actual data inside the packet is called the payload
# raw layer contains actual data being sent by tcp/udp
#payload[:50] shows only the first 50 bytes 
#count=20 prevents infinite output 